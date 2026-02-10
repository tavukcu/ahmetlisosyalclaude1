import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { optionIndex } = body

    if (typeof optionIndex !== 'number') {
      return NextResponse.json({ error: 'optionIndex required' }, { status: 400 })
    }

    const payload = await getPayload()
    const poll = await payload.findByID({ collection: 'polls', id })

    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    const options = (poll.options || []) as Array<{ text: string; votes: number; id?: string }>

    if (optionIndex < 0 || optionIndex >= options.length) {
      return NextResponse.json({ error: 'Invalid option index' }, { status: 400 })
    }

    options[optionIndex].votes = (options[optionIndex].votes || 0) + 1
    const totalVotes = options.reduce((sum, o) => sum + (o.votes || 0), 0)

    await payload.update({
      collection: 'polls',
      id,
      data: { options, totalVotes },
    })

    return NextResponse.json({ success: true, totalVotes })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

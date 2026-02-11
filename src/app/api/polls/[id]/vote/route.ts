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

    // Check if user already voted on this poll via cookie
    const votedPolls = request.cookies.get('voted_polls')?.value
    const votedPollIds = votedPolls ? votedPolls.split(',') : []
    if (votedPollIds.includes(id)) {
      return NextResponse.json({ error: 'Bu ankette zaten oy kullandınız' }, { status: 403 })
    }

    const payload = await getPayload()
    const poll = await payload.findByID({ collection: 'polls', id })

    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 })
    }

    if (!poll.active) {
      return NextResponse.json({ error: 'Bu anket artık aktif değil' }, { status: 400 })
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

    // Set cookie to prevent duplicate votes
    const updatedVotedPolls = [...votedPollIds, id].join(',')
    const response = NextResponse.json({ success: true, totalVotes })
    response.cookies.set('voted_polls', updatedVotedPolls, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

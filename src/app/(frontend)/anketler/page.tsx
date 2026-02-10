export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import PollWidget from '@/components/PollWidget'
import { FiChevronRight } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Anketler',
  description: 'Ahmetli Sosyal anketleri — Görüşlerinizi paylaşın!',
}

export default async function PollsPage() {
  let polls: any[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'polls',
      sort: '-createdAt',
      limit: 20,
    })
    polls = result.docs
  } catch {
    // Use empty array
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-400">Anketler</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Anketler
      </h1>

      {polls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll: any) => (
            <PollWidget
              key={poll.id}
              pollId={poll.id}
              question={poll.question}
              options={poll.options}
              totalVotes={poll.totalVotes}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-lg mx-auto">
          <PollWidget />
          <p className="text-center text-sm text-gray-400 mt-4">
            Admin panelinden yeni anketler ekleyebilirsiniz.
          </p>
        </div>
      )}
    </div>
  )
}

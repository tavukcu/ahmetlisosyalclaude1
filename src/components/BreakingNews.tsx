'use client'

import Link from 'next/link'

interface BreakingNewsItem {
  id: string
  title: string
  slug: string
}

interface BreakingNewsProps {
  items: BreakingNewsItem[]
}

export default function BreakingNews({ items }: BreakingNewsProps) {
  if (items.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 font-bold text-sm uppercase tracking-wider">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse-dot" />
          Son Dakika
        </div>
        <div className="flex-1 overflow-hidden py-2.5 ml-3 border-l border-white/20 pl-4">
          <div className="breaking-news-ticker">
            <div className="ticker-content flex items-center gap-10">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/haber/${item.slug}`}
                  className="text-sm font-medium hover:underline whitespace-nowrap inline-flex items-center gap-3"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

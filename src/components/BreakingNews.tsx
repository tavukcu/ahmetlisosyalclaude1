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
    <div className="bg-danger text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="flex-shrink-0 bg-white/20 px-3 py-2 font-bold text-sm uppercase tracking-wide">
          Son Dakika
        </div>
        <div className="flex-1 overflow-hidden py-2 ml-3">
          <div className="breaking-news-ticker">
            <div className="ticker-content flex items-center gap-8">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/haber/${item.slug}`}
                  className="text-sm hover:underline whitespace-nowrap inline-flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
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

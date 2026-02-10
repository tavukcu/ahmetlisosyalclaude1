export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import NewsCard from '@/components/NewsCard'
import Pagination from '@/components/Pagination'
import Sidebar from '@/components/Sidebar'
import { FiChevronRight } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Tüm Haberler',
  description: 'Ahmetli Sosyal — Tüm haberler listesi',
}

interface PageProps {
  searchParams: Promise<{ sayfa?: string }>
}

const ITEMS_PER_PAGE = 12

export default async function AllNewsPage({ searchParams }: PageProps) {
  const { sayfa } = await searchParams
  const page = Math.max(1, parseInt(sayfa || '1', 10))

  let news: any[] = []
  let totalPages = 1

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'news',
      limit: ITEMS_PER_PAGE,
      page,
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
      depth: 2,
    })
    news = result.docs
    totalPages = result.totalPages
  } catch {
    // Empty
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-400">Tüm Haberler</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Tüm Haberler
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {news.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {news.map((item: any, index: number) => (
                  <NewsCard
                    key={item.id}
                    title={item.title}
                    slug={item.slug}
                    summary={item.summary}
                    coverImage={item.coverImage}
                    category={typeof item.category === 'object' ? item.category : undefined}
                    publishedAt={item.publishedAt || item.createdAt}
                    viewCount={item.viewCount}
                    index={index}
                  />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                basePath="/haber"
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">📭</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Henüz haber yok</h2>
              <p className="text-gray-500">Admin panelinden haber ekleyerek başlayabilirsiniz.</p>
              <Link href="/admin" className="btn-primary inline-block mt-4">
                Admin Paneli
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import NewsCard from '@/components/NewsCard'
import Pagination from '@/components/Pagination'
import { FiChevronRight, FiSearch } from 'react-icons/fi'

interface PageProps {
  searchParams: Promise<{ q?: string; sayfa?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `"${q}" Arama Sonuçları` : 'Arama',
    description: q ? `"${q}" ile ilgili haberler` : 'Ahmetli Sosyal haber arama',
  }
}

const ITEMS_PER_PAGE = 12

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, sayfa } = await searchParams
  const query = q?.trim() || ''
  const page = Math.max(1, parseInt(sayfa || '1', 10))

  let news: any[] = []
  let totalPages = 1
  let totalDocs = 0

  if (query) {
    try {
      const payload = await getPayload()
      const result = await payload.find({
        collection: 'news',
        limit: ITEMS_PER_PAGE,
        page,
        sort: '-publishedAt',
        where: {
          and: [
            { status: { equals: 'published' } },
            {
              or: [
                { title: { contains: query } },
                { summary: { contains: query } },
              ],
            },
          ],
        },
        depth: 2,
      })
      news = result.docs
      totalPages = result.totalPages
      totalDocs = result.totalDocs
    } catch {
      // Empty results
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-400">Arama</span>
      </nav>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto mb-8">
        <form action="/arama" method="GET">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Haber ara..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-800 text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-6"
            >
              Ara
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {query && (
        <>
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-800">
              &ldquo;{query}&rdquo; için {totalDocs} sonuç bulundu
            </h1>
          </div>

          {news.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                basePath={`/arama?q=${encodeURIComponent(query)}`}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Sonuç bulunamadı</h2>
              <p className="text-gray-500">
                &ldquo;{query}&rdquo; ile eşleşen haber bulunamadı. Farklı anahtar kelimeler deneyin.
              </p>
            </div>
          )}
        </>
      )}

      {!query && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Haber Arayın</h2>
          <p className="text-gray-500">Yukarıdaki arama kutusuna bir kelime yazarak haberleri arayabilirsiniz.</p>
        </div>
      )}
    </div>
  )
}

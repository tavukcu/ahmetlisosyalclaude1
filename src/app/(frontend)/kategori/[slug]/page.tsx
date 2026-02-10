import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import NewsCard from '@/components/NewsCard'
import Pagination from '@/components/Pagination'
import Sidebar from '@/components/Sidebar'
import { FiChevronRight } from 'react-icons/fi'
import { getCategoryColor } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sayfa?: string }>
}

const ITEMS_PER_PAGE = 9

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const category = result.docs[0] as any
    if (!category) return { title: 'Kategori Bulunamadı' }

    return {
      title: `${category.name} Haberleri`,
      description: category.description || `${category.name} kategorisindeki en güncel haberler`,
    }
  } catch {
    return { title: 'Kategori' }
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { sayfa } = await searchParams
  const page = Math.max(1, parseInt(sayfa || '1', 10))

  let category: any = null
  let news: any[] = []
  let totalPages = 1

  try {
    const payload = await getPayload()

    const categoryResult = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    category = categoryResult.docs[0]

    if (category) {
      const newsResult = await payload.find({
        collection: 'news',
        limit: ITEMS_PER_PAGE,
        page,
        sort: '-publishedAt',
        where: {
          and: [
            { category: { equals: category.id } },
            { status: { equals: 'published' } },
          ],
        },
        depth: 2,
      })
      news = newsResult.docs
      totalPages = newsResult.totalPages
    }
  } catch {
    // Fall through
  }

  if (!category) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-400">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-1.5 h-8 rounded-full"
            style={{ backgroundColor: getCategoryColor(category.color) }}
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {category.name} Haberleri
          </h1>
        </div>
        {category.description && (
          <p className="text-gray-500 ml-5">{category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Grid */}
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
                basePath={`/kategori/${slug}`}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">📭</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Henüz haber yok</h2>
              <p className="text-gray-500">Bu kategoride henüz yayınlanmış haber bulunmuyor.</p>
              <Link href="/" className="btn-primary inline-block mt-4">
                Ana Sayfaya Dön
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

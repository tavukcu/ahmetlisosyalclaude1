import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import ShareButtons from '@/components/ShareButtons'
import AdBannerServer from '@/components/AdBannerServer'
import NewsCard from '@/components/NewsCard'
import { formatDateTime, getCategoryColor } from '@/lib/utils'
import { FiClock, FiEye, FiUser, FiChevronRight } from 'react-icons/fi'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })

    const article = result.docs[0] as any
    if (!article) return { title: 'Haber Bulunamadı' }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const title = article.seo?.metaTitle || article.title
    const description = article.seo?.metaDescription || article.summary
    const imageUrl = article.coverImage?.url

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: article.publishedAt,
        authors: [article.author?.name || 'Ahmetli Sosyal'],
        images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
        url: `${siteUrl}/haber/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
      alternates: {
        canonical: `${siteUrl}/haber/${slug}`,
      },
    }
  } catch {
    return { title: 'Haber' }
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params

  let article: any = null
  let relatedNews: any[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })

    article = result.docs[0]

    if (article) {
      // Increment view count
      await payload.update({
        collection: 'news',
        id: article.id,
        data: { viewCount: (article.viewCount || 0) + 1 },
      })

      // Fetch related news (same category)
      if (article.category) {
        const categoryId = typeof article.category === 'object' ? article.category.id : article.category
        const relatedResult = await payload.find({
          collection: 'news',
          limit: 3,
          sort: '-publishedAt',
          where: {
            and: [
              { category: { equals: categoryId } },
              { id: { not_equals: article.id } },
              { status: { equals: 'published' } },
            ],
          },
          depth: 2,
        })
        relatedNews = relatedResult.docs
      }
    }
  } catch {
    // Fall through to notFound
  }

  if (!article) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const category = typeof article.category === 'object' ? article.category : null
  const author = typeof article.author === 'object' ? article.author : null
  const coverImage = typeof article.coverImage === 'object' ? article.coverImage : null

  // Extract text content from Lexical rich text
  function extractTextFromLexical(content: any): string {
    if (!content?.root?.children) return ''
    return content.root.children
      .map((node: any) => {
        if (node.children) {
          return node.children.map((child: any) => child.text || '').join('')
        }
        return node.text || ''
      })
      .join('\n\n')
  }

  // Render Lexical rich text as HTML paragraphs
  function renderRichText(content: any) {
    if (!content?.root?.children) {
      return <p className="text-gray-600">İçerik yükleniyor...</p>
    }

    return content.root.children.map((node: any, index: number) => {
      const text = node.children?.map((child: any) => {
        let t = child.text || ''
        if (child.format === 1) return <strong key={child.text}>{t}</strong>
        if (child.format === 2) return <em key={child.text}>{t}</em>
        return t
      })

      if (node.type === 'heading') {
        const Tag = `h${node.tag?.replace('h', '') || '2'}` as keyof React.JSX.IntrinsicElements
        return <Tag key={index} className="font-bold mt-4 mb-2">{text}</Tag>
      }

      if (node.type === 'list') {
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={index} className={`${node.listType === 'number' ? 'list-decimal' : 'list-disc'} pl-6 my-2`}>
            {node.children?.map((item: any, i: number) => (
              <li key={i}>{item.children?.map((c: any) => c.text || '').join('')}</li>
            ))}
          </ListTag>
        )
      }

      return <p key={index} className="mb-4">{text}</p>
    })
  }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: coverImage?.url ? [`${siteUrl}${coverImage.url}`] : [],
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      '@type': 'Person',
      name: author?.name || 'Ahmetli Sosyal',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ahmetli Sosyal',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/haber/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
          <FiChevronRight className="w-3 h-3" />
          {category && (
            <>
              <Link href={`/kategori/${category.slug}`} className="hover:text-primary-600">
                {category.name}
              </Link>
              <FiChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-gray-400 truncate max-w-[200px]">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            {category && (
              <Link href={`/kategori/${category.slug}`}>
                <span
                  className="category-badge mb-3 inline-block"
                  style={{ backgroundColor: getCategoryColor(category.color) }}
                >
                  {category.name}
                </span>
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance leading-tight">
              {article.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              {article.publishedAt && (
                <span className="flex items-center gap-1">
                  <FiClock className="w-4 h-4" />
                  {formatDateTime(article.publishedAt)}
                </span>
              )}
              {author && (
                <span className="flex items-center gap-1">
                  <FiUser className="w-4 h-4" />
                  {author.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                {(article.viewCount || 0) + 1} görüntülenme
              </span>
            </div>

            {/* Share Buttons */}
            <div className="mb-6">
              <ShareButtons url={`/haber/${slug}`} title={article.title} />
            </div>

            {/* Cover Image */}
            {coverImage && (
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
                <Image
                  src={coverImage.url}
                  alt={coverImage.alt || article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {/* Summary */}
            <p className="text-lg text-gray-600 font-medium border-l-4 border-primary-500 pl-4 mb-6">
              {article.summary}
            </p>

            {/* Ad before content */}
            <AdBannerServer position="in-article" />

            {/* Content */}
            <div className="prose prose-lg max-w-none mt-6">
              {renderRichText(article.content)}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
                {article.tags.map((tag: any, i: number) => (
                  <Link
                    key={i}
                    href={`/arama?q=${encodeURIComponent(tag.tag)}`}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    #{tag.tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Share Buttons (bottom) */}
            <div className="mt-6 pt-6 border-t">
              <ShareButtons url={`/haber/${slug}`} title={article.title} />
            </div>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-bold text-gray-800 border-b-2 border-primary-600 pb-2 mb-4">
                  İlgili Haberler
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedNews.map((item: any, index: number) => (
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
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <AdBannerServer position="sidebar" />
              <AdBannerServer position="sidebar" />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

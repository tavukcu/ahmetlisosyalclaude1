import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${siteUrl}/haber`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hava-durumu`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/anketler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]

  // Dynamic news pages
  let newsPages: MetadataRoute.Sitemap = []
  let categoryPages: MetadataRoute.Sitemap = []

  try {
    const { getPayload: getPayloadClient } = await import('payload')
    const config = await import('@payload-config')
    const payload = await getPayloadClient({ config: config.default })

    const news = await payload.find({
      collection: 'news',
      limit: 1000,
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
    })

    newsPages = news.docs.map((doc: any) => ({
      url: `${siteUrl}/haber/${doc.slug}`,
      lastModified: new Date(doc.updatedAt || doc.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const categories = await payload.find({
      collection: 'categories',
      limit: 100,
    })

    categoryPages = categories.docs.map((doc: any) => ({
      url: `${siteUrl}/kategori/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  } catch {
    // Sitemap will just have static pages
  }

  return [...staticPages, ...categoryPages, ...newsPages]
}

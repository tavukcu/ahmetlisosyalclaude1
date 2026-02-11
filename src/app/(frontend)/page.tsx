export const dynamic = 'force-dynamic'

import { getPayload } from '@/lib/payload'
import NewsCard from '@/components/NewsCard'
import BreakingNews from '@/components/BreakingNews'
import Sidebar from '@/components/Sidebar'
import AdBannerServer from '@/components/AdBannerServer'
import { getCurrentWeather, getWeatherIcon } from '@/lib/weather'

// Mock data for initial display when no news exists yet
const mockNews = [
  {
    id: '1',
    title: 'Ahmetli Belediyesi Yeni Park Projesi Başlattı',
    slug: 'ahmetli-belediyesi-yeni-park-projesi',
    summary: 'Ahmetli Belediyesi, ilçe merkezinde yeni bir park ve yeşil alan projesi başlattı. Proje kapsamında 5.000 metrekarelik alan düzenlenecek.',
    coverImage: null,
    category: { name: 'Gündem', slug: 'gundem', color: '#0E4D3D' },
    publishedAt: new Date().toISOString(),
    viewCount: 245,
    featured: true,
  },
  {
    id: '2',
    title: 'Ahmetli\'de Zeytin Hasadı Başladı',
    slug: 'ahmetlide-zeytin-hasadi-basladi',
    summary: 'İlçemizde zeytin hasadı sezonu resmen başladı. Üreticiler bu yıl verimli bir sezon bekliyor.',
    coverImage: null,
    category: { name: 'Tarım', slug: 'tarim', color: '#16a34a' },
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    viewCount: 189,
  },
  {
    id: '3',
    title: 'Ahmetlispor Deplasmanda Galip Geldi',
    slug: 'ahmetlispor-deplasmanda-galip',
    summary: 'Ahmetlispor, hafta sonu oynanan deplasman maçında rakibini 2-1 mağlup etti.',
    coverImage: null,
    category: { name: 'Spor', slug: 'spor', color: '#dc2626' },
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    viewCount: 312,
  },
  {
    id: '4',
    title: 'Yeni Sağlık Merkezi Hizmete Açıldı',
    slug: 'yeni-saglik-merkezi-hizmete-acildi',
    summary: 'Ahmetli\'de yapımı tamamlanan yeni aile sağlığı merkezi kapılarını vatandaşlara açtı.',
    coverImage: null,
    category: { name: 'Yaşam', slug: 'yasam', color: '#7c3aed' },
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    viewCount: 156,
  },
  {
    id: '5',
    title: 'İlçede Kültür Festivali Düzenlenecek',
    slug: 'ilcede-kultur-festivali-duzenlenecek',
    summary: 'Ahmetli Belediyesi, geleneksel kültür ve sanat festivalinin tarihini açıkladı.',
    coverImage: null,
    category: { name: 'Kültür', slug: 'kultur', color: '#ea580c' },
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    viewCount: 98,
  },
  {
    id: '6',
    title: 'Esnaf Destek Paketi Açıklandı',
    slug: 'esnaf-destek-paketi-aciklandi',
    summary: 'Hükümetin yeni ekonomi paketinde küçük esnafa yönelik destekler yer alıyor.',
    coverImage: null,
    category: { name: 'Ekonomi', slug: 'ekonomi', color: '#0891b2' },
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    viewCount: 201,
  },
]

export default async function HomePage() {
  let news: typeof mockNews = []
  let breakingNewsItems: Array<{ id: string; title: string; slug: string }> = []

  try {
    const payload = await getPayload()

    const newsResult = await payload.find({
      collection: 'news',
      limit: 12,
      sort: '-publishedAt',
      where: {
        status: { equals: 'published' },
      },
      depth: 2,
    })

    if (newsResult.docs.length > 0) {
      news = newsResult.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary,
        coverImage: doc.coverImage,
        category: doc.category,
        publishedAt: doc.publishedAt || doc.createdAt,
        viewCount: doc.viewCount || 0,
        featured: doc.featured || false,
      }))

      // Get breaking news
      const breakingResult = await payload.find({
        collection: 'news',
        limit: 5,
        sort: '-createdAt',
        where: {
          breakingNews: { equals: true },
          status: { equals: 'published' },
        },
      })

      breakingNewsItems = breakingResult.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
      }))
    } else {
      news = mockNews
    }
  } catch {
    news = mockNews
  }

  const weather = await getCurrentWeather()
  const weatherIcon = weather ? getWeatherIcon(weather.icon) : null

  const featuredNews = news.find(n => n.featured) || news[0]
  const gridNews = news.filter(n => n.id !== featuredNews?.id).slice(0, 8)

  return (
    <>
      {/* Breaking News Banner */}
      <BreakingNews items={breakingNewsItems} />

      {/* Header Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <AdBannerServer position="header-banner" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Hero / Featured News */}
            {featuredNews && (
              <div className="mb-8">
                <NewsCard
                  title={featuredNews.title}
                  slug={featuredNews.slug}
                  summary={featuredNews.summary}
                  coverImage={featuredNews.coverImage as any}
                  category={featuredNews.category as any}
                  publishedAt={featuredNews.publishedAt}
                  viewCount={featuredNews.viewCount}
                  featured
                />
              </div>
            )}

            {/* News Grid */}
            <div className="section-header mb-6">
              <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent-400 rounded-full" />
                Son Haberler
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gridNews.map((item, index) => (
                <NewsCard
                  key={item.id}
                  title={item.title}
                  slug={item.slug}
                  summary={item.summary}
                  coverImage={item.coverImage as any}
                  category={item.category as any}
                  publishedAt={item.publishedAt}
                  viewCount={item.viewCount}
                  index={index}
                />
              ))}
            </div>

            {/* In-article Ad */}
            <div className="mt-8">
              <AdBannerServer position="in-article" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              weatherTemp={weather?.temp}
              weatherDescription={weather?.description}
              weatherIcon={weatherIcon}
            />
          </div>
        </div>
      </div>

      {/* Footer Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <AdBannerServer position="footer-banner" />
      </div>
    </>
  )
}

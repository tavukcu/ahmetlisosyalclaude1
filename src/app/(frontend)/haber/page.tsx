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

const mockNews = [
  {
    id: 'm1',
    title: 'Ahmetli Belediyesi Yeni Park ve Yeşil Alan Projesi Başlattı',
    slug: 'ahmetli-belediyesi-yeni-park-projesi',
    summary: 'Ahmetli Belediyesi, ilçe merkezinde 5.000 metrekarelik yeni bir park ve yeşil alan projesi başlattı. Proje kapsamında yürüyüş yolları, çocuk oyun alanları ve spor tesisleri yer alacak.',
    coverImage: {
      url: 'https://picsum.photos/seed/park1/800/500',
      alt: 'Ahmetli Belediyesi Yeni Park Projesi',
      sizes: { card: { url: 'https://picsum.photos/seed/park1/800/500' } },
    },
    category: { name: 'Gündem', slug: 'gundem', color: '#0E4D3D' },
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    viewCount: 347,
  },
  {
    id: 'm2',
    title: 'Ahmetli\'de Zeytin Hasadı Sezonu Resmen Açıldı',
    slug: 'ahmetlide-zeytin-hasadi-basladi',
    summary: 'İlçemizde zeytin hasadı sezonu resmen başladı. Tarım uzmanları bu yıl bölgenin yüzde 20 daha verimli bir sezon geçireceğini öngörüyor.',
    coverImage: {
      url: 'https://picsum.photos/seed/olive2/800/500',
      alt: 'Zeytin Hasadı',
      sizes: { card: { url: 'https://picsum.photos/seed/olive2/800/500' } },
    },
    category: { name: 'Tarım', slug: 'tarim', color: '#16a34a' },
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    viewCount: 215,
  },
  {
    id: 'm3',
    title: 'Ahmetlispor Deplasmanda 2-1 Galip Geldi',
    slug: 'ahmetlispor-deplasmanda-galip',
    summary: 'Ahmetlispor, bölge liginde oynanan deplasman maçında rakibini 2-1 mağlup etti. Goller 34. ve 78. dakikalarda geldi.',
    coverImage: {
      url: 'https://picsum.photos/seed/football3/800/500',
      alt: 'Ahmetlispor Maçı',
      sizes: { card: { url: 'https://picsum.photos/seed/football3/800/500' } },
    },
    category: { name: 'Spor', slug: 'spor', color: '#dc2626' },
    publishedAt: new Date(Date.now() - 5400000).toISOString(),
    viewCount: 489,
  },
  {
    id: 'm4',
    title: 'Yeni Aile Sağlığı Merkezi Kapılarını Açtı',
    slug: 'yeni-saglik-merkezi-hizmete-acildi',
    summary: 'Ahmetli\'de yapımı tamamlanan modern aile sağlığı merkezi hizmete girdi. Merkez haftanın 6 günü 08:00-18:00 saatleri arasında vatandaşlara hizmet verecek.',
    coverImage: {
      url: 'https://picsum.photos/seed/health4/800/500',
      alt: 'Yeni Sağlık Merkezi',
      sizes: { card: { url: 'https://picsum.photos/seed/health4/800/500' } },
    },
    category: { name: 'Yaşam', slug: 'yasam', color: '#7c3aed' },
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    viewCount: 178,
  },
  {
    id: 'm5',
    title: 'Geleneksel Zeytin Kültürü Festivali Bu Yıl 3 Gün Sürecek',
    slug: 'geleneksel-zeytin-kulturu-festivali',
    summary: 'Ahmetli Belediyesi, bu yıl 15-17 Kasım tarihleri arasında gerçekleştirilecek Zeytin Kültürü Festivali\'nin programını açıkladı. Müzik, halk oyunları ve gastronomi etkinlikleri içerecek.',
    coverImage: {
      url: 'https://picsum.photos/seed/festival5/800/500',
      alt: 'Zeytin Kültürü Festivali',
      sizes: { card: { url: 'https://picsum.photos/seed/festival5/800/500' } },
    },
    category: { name: 'Kültür', slug: 'kultur', color: '#ea580c' },
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    viewCount: 132,
  },
  {
    id: 'm6',
    title: 'Küçük Esnafa Yönelik Faizsiz Kredi Desteği Başlıyor',
    slug: 'kucuk-esnafa-faizsiz-kredi-destegi',
    summary: 'İlçemizdeki küçük esnaf ve sanatkârlara yönelik faizsiz kredi desteği programı hayata geçirildi. Başvurular ilçe ticaret odasından yapılabilir.',
    coverImage: {
      url: 'https://picsum.photos/seed/economy6/800/500',
      alt: 'Esnaf Destek Programı',
      sizes: { card: { url: 'https://picsum.photos/seed/economy6/800/500' } },
    },
    category: { name: 'Ekonomi', slug: 'ekonomi', color: '#0891b2' },
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    viewCount: 263,
  },
  {
    id: 'm7',
    title: 'İlköğretim Okullarına Yeni Spor Salonu Yapılıyor',
    slug: 'ilkogretim-okuluna-spor-salonu',
    summary: 'İl Milli Eğitim Müdürlüğü, Ahmetli\'deki iki ilköğretim okuluna birer kapalı spor salonu inşaatı başlattığını açıkladı. Tesis 2025 yılı başında tamamlanacak.',
    coverImage: {
      url: 'https://picsum.photos/seed/sports7/800/500',
      alt: 'Okul Spor Salonu',
      sizes: { card: { url: 'https://picsum.photos/seed/sports7/800/500' } },
    },
    category: { name: 'Eğitim', slug: 'egitim', color: '#2563eb' },
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    viewCount: 145,
  },
  {
    id: 'm8',
    title: 'Sulama Kanalları Modernizasyon Çalışmaları Tamamlandı',
    slug: 'sulama-kanallari-modernizasyon',
    summary: 'DSİ ekipleri, Ahmetli Ovasında yürütülen sulama kanalı modernizasyon projesini tamamladı. 1.200 hektar tarım arazisi artık basınçlı sulama sisteminden yararlanacak.',
    coverImage: {
      url: 'https://picsum.photos/seed/irrigation8/800/500',
      alt: 'Sulama Kanalları',
      sizes: { card: { url: 'https://picsum.photos/seed/irrigation8/800/500' } },
    },
    category: { name: 'Tarım', slug: 'tarim', color: '#16a34a' },
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    viewCount: 192,
  },
  {
    id: 'm9',
    title: 'Ahmetli Halk Kütüphanesi Yenilendi ve Genişletildi',
    slug: 'ahmetli-halk-kutuphanesi-yenilendi',
    summary: 'İlçe halk kütüphanesi kapsamlı bir yenileme sürecinden geçti. 15.000 yeni kitap eklenen kütüphane, çocuk okuma salonu ve dijital araştırma merkeziyle genişledi.',
    coverImage: {
      url: 'https://picsum.photos/seed/library9/800/500',
      alt: 'Halk Kütüphanesi',
      sizes: { card: { url: 'https://picsum.photos/seed/library9/800/500' } },
    },
    category: { name: 'Kültür', slug: 'kultur', color: '#ea580c' },
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    viewCount: 87,
  },
  {
    id: 'm10',
    title: 'Doğalgaz Altyapı Genişletme Çalışmaları Başladı',
    slug: 'dogalgaz-altyapi-genisleme-calismasi',
    summary: 'İzmir Büyükşehir Belediyesi, Ahmetli\'nin kırsal mahallelerini doğalgaz şebekesine bağlama projesini hayata geçirdi. 8 mahalleye hizmet ulaşacak.',
    coverImage: {
      url: 'https://picsum.photos/seed/gas10/800/500',
      alt: 'Doğalgaz Altyapısı',
      sizes: { card: { url: 'https://picsum.photos/seed/gas10/800/500' } },
    },
    category: { name: 'Gündem', slug: 'gundem', color: '#0E4D3D' },
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    viewCount: 304,
  },
  {
    id: 'm11',
    title: 'Ahmetli U19 Voleybol Takımı Bölge Şampiyonu Oldu',
    slug: 'ahmetli-u19-voleybol-sampiyonu',
    summary: 'Ahmetli Spor Kulübü U19 voleybol takımı, Ege Bölgesi gençler şampiyonasında üst üste ikinci kez şampiyonluk kupasını aldı.',
    coverImage: {
      url: 'https://picsum.photos/seed/volleyball11/800/500',
      alt: 'Voleybol Şampiyonluğu',
      sizes: { card: { url: 'https://picsum.photos/seed/volleyball11/800/500' } },
    },
    category: { name: 'Spor', slug: 'spor', color: '#dc2626' },
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
    viewCount: 421,
  },
  {
    id: 'm12',
    title: 'Organik Tarım Sertifikasyon Programı İlçemizde Başlıyor',
    slug: 'organik-tarim-sertifikasyon-programi',
    summary: 'Tarım ve Orman Bakanlığı ile Ahmetli Tarım İlçe Müdürlüğü iş birliğiyle yürütülecek organik tarım sertifikasyon programına başvurular başladı.',
    coverImage: {
      url: 'https://picsum.photos/seed/organic12/800/500',
      alt: 'Organik Tarım',
      sizes: { card: { url: 'https://picsum.photos/seed/organic12/800/500' } },
    },
    category: { name: 'Tarım', slug: 'tarim', color: '#16a34a' },
    publishedAt: new Date(Date.now() - 36000000).toISOString(),
    viewCount: 156,
  },
]

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

  const displayNews = news.length > 0 ? news : mockNews

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayNews.map((item: any, index: number) => (
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
          {news.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/haber"
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const defaultCategories = [
  { name: 'Gündem', slug: 'gundem' },
  { name: 'Spor', slug: 'spor' },
  { name: 'Ekonomi', slug: 'ekonomi' },
  { name: 'Tarım', slug: 'tarim' },
  { name: 'Kültür', slug: 'kultur' },
  { name: 'Yaşam', slug: 'yasam' },
]

const quickLinks = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hava Durumu', href: '/hava-durumu' },
  { name: 'Anketler', href: '/anketler' },
  { name: 'Tüm Haberler', href: '/haber' },
]

interface FooterProps {
  settings?: {
    siteName?: string
    footer?: {
      about?: string
      copyright?: string
    }
    socialMedia?: {
      facebook?: string
      twitter?: string
      instagram?: string
      youtube?: string
    }
    contactInfo?: {
      email?: string
      phone?: string
      address?: string
    }
  } | null
}

export default function Footer({ settings }: FooterProps) {
  const siteName = settings?.siteName || 'Ahmetli Sosyal'
  const about = settings?.footer?.about || 'Ahmetli ve çevresinin en güncel haberleri, hava durumu bilgileri, tarımsal veriler ve yerel gelişmeler için güvenilir kaynağınız.'
  const copyright = settings?.footer?.copyright || `© ${new Date().getFullYear()} ${siteName}. Tüm hakları saklıdır.`
  const facebook = settings?.socialMedia?.facebook || '#'
  const twitter = settings?.socialMedia?.twitter || '#'
  const instagram = settings?.socialMedia?.instagram || '#'
  const youtube = settings?.socialMedia?.youtube || '#'
  const email = settings?.contactInfo?.email || 'info@ahmetlisosyal.com'
  const phone = settings?.contactInfo?.phone || '(0236) 500 00 00'
  const address = settings?.contactInfo?.address || 'Ahmetli, Manisa, Türkiye'

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-extrabold text-lg">A</span>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent-400 rounded-full border-2 border-gray-900" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-lg tracking-tight">{siteName}</h3>
                <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Haber Portalı</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {about}
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-2">
              <a href={facebook} className="p-2.5 bg-gray-800/80 hover:bg-primary-600 rounded-xl transition-all duration-200 hover:scale-105" aria-label="Facebook">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href={twitter} className="p-2.5 bg-gray-800/80 hover:bg-primary-600 rounded-xl transition-all duration-200 hover:scale-105" aria-label="Twitter">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href={instagram} className="p-2.5 bg-gray-800/80 hover:bg-primary-600 rounded-xl transition-all duration-200 hover:scale-105" aria-label="Instagram">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href={youtube} className="p-2.5 bg-gray-800/80 hover:bg-primary-600 rounded-xl transition-all duration-200 hover:scale-105" aria-label="YouTube">
                <FiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Kategoriler</h4>
            <ul className="space-y-2.5">
              {defaultCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-accent-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Hızlı Bağlantılar</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <div className="p-2 bg-gray-800/80 rounded-lg mt-0.5">
                  <FiMapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">{address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <div className="p-2 bg-gray-800/80 rounded-lg">
                  <FiMail className="w-3.5 h-3.5" />
                </div>
                <a href={`mailto:${email}`} className="hover:text-accent-400 transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <div className="p-2 bg-gray-800/80 rounded-lg">
                  <FiPhone className="w-3.5 h-3.5" />
                </div>
                <a href={`tel:${phone.replace(/\D/g, '').replace(/^0/, '+90')}`} className="hover:text-accent-400 transition-colors">
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">{copyright}</p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-300 transition-colors">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Kullanım Şartları</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

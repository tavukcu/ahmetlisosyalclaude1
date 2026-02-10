import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const categories = [
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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Ahmetli Sosyal</h3>
                <p className="text-xs text-gray-400">Haber Portalı</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ahmetli ve çevresinin en güncel haberleri, hava durumu bilgileri,
              tarımsal veriler ve yerel gelişmeler için güvenilir kaynağınız.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors" aria-label="Facebook">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors" aria-label="Twitter">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors" aria-label="Instagram">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors" aria-label="YouTube">
                <FiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kategoriler</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Ahmetli, Manisa, Türkiye</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <FiMail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@ahmetlisosyal.com" className="hover:text-primary-400 transition-colors">
                  info@ahmetlisosyal.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <FiPhone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+902365000000" className="hover:text-primary-400 transition-colors">
                  (0236) 500 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ahmetli Sosyal. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-300 transition-colors">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Kullanım Şartları</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

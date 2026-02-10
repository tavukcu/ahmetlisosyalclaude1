'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiSearch, FiSun, FiCloud } from 'react-icons/fi'

interface Category {
  id: string
  name: string
  slug: string
}

interface HeaderProps {
  categories?: Category[]
  weatherTemp?: number | null
  weatherIcon?: string | null
  currencyTicker?: string
}

export default function Header({ categories = [], weatherTemp, weatherIcon, currencyTicker }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const defaultCategories: Category[] = categories.length > 0 ? categories : [
    { id: '1', name: 'Gündem', slug: 'gundem' },
    { id: '2', name: 'Spor', slug: 'spor' },
    { id: '3', name: 'Ekonomi', slug: 'ekonomi' },
    { id: '4', name: 'Tarım', slug: 'tarim' },
    { id: '5', name: 'Kültür', slug: 'kultur' },
    { id: '6', name: 'Yaşam', slug: 'yasam' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/arama?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      {/* Currency Ticker */}
      {currencyTicker && (
        <div className="bg-primary-900 text-white text-xs py-1 overflow-hidden">
          <div className="breaking-news-ticker">
            <span className="ticker-content px-4">{currencyTicker}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary-800 leading-tight">Ahmetli Sosyal</h1>
                <p className="text-[10px] text-gray-500 -mt-0.5">Haber Portalı</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {defaultCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/kategori/${cat.slug}`}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Mini Weather */}
              {weatherTemp !== null && weatherTemp !== undefined && (
                <Link
                  href="/hava-durumu"
                  className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {weatherIcon ? (
                    <span className="text-lg">{weatherIcon}</span>
                  ) : (
                    <FiSun className="text-yellow-500" />
                  )}
                  <span className="font-semibold">{weatherTemp}°C</span>
                  <span className="text-xs text-gray-400">Ahmetli</span>
                </Link>
              )}

              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                aria-label="Arama"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                aria-label="Menü"
              >
                {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {defaultCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/kategori/${cat.slug}`}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/hava-durumu"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hava Durumu
              </Link>
              <Link
                href="/anketler"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Anketler
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Haber Ara</h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Haber başlığı veya anahtar kelime..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-800"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="mt-3 w-full btn-primary"
              >
                Ara
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

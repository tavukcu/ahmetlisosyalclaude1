'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiSearch, FiSun, FiChevronRight } from 'react-icons/fi'

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
      {/* Top Bar - Currency Ticker */}
      {currencyTicker && (
        <div className="bg-primary-900 text-primary-100 text-xs py-1.5 overflow-hidden border-b border-primary-800">
          <div className="breaking-news-ticker">
            <span className="ticker-content px-4 tracking-wide">{currencyTicker}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:shadow-primary-600/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-extrabold text-lg">A</span>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent-400 rounded-full border-2 border-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-extrabold text-primary-800 leading-tight tracking-tight">Ahmetli Sosyal</h1>
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-0.5">Haber Portalı</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {defaultCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/kategori/${cat.slug}`}
                  className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors duration-200 group"
                >
                  {cat.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent-400 rounded-full group-hover:w-6 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Mini Weather */}
              {weatherTemp !== null && weatherTemp !== undefined && (
                <Link
                  href="/hava-durumu"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-xl text-sm text-primary-700 hover:bg-primary-100 transition-all duration-200"
                >
                  {weatherIcon ? (
                    <span className="text-lg">{weatherIcon}</span>
                  ) : (
                    <FiSun className="text-accent-500" />
                  )}
                  <span className="font-bold">{weatherTemp}°</span>
                </Link>
              )}

              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                aria-label="Arama"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                aria-label="Menü"
              >
                {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
            <nav className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
              {defaultCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/kategori/${cat.slug}`}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                  <FiChevronRight className="w-4 h-4 text-gray-300" />
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <Link
                  href="/hava-durumu"
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hava Durumu
                  <FiChevronRight className="w-4 h-4 text-gray-300" />
                </Link>
                <Link
                  href="/anketler"
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Anketler
                  <FiChevronRight className="w-4 h-4 text-gray-300" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24" onClick={() => setSearchOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-6 animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">Haber Ara</h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Haber başlığı veya anahtar kelime..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none text-gray-800 text-base placeholder:text-gray-400 transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full btn-primary py-3.5 text-base"
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

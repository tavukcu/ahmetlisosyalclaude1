'use client'

import Link from 'next/link'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  const getHref = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}?sayfa=${page}`
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Sayfalama">
      {currentPage > 1 && (
        <Link
          href={getHref(currentPage - 1)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Önceki sayfa"
        >
          <FiChevronLeft className="w-5 h-5" />
        </Link>
      )}

      {pages.map((page, i) => {
        if (page === '...') {
          return (
            <span key={`dots-${i}`} className="px-2 text-gray-400">
              ...
            </span>
          )
        }

        return (
          <Link
            key={page}
            href={getHref(page)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        )
      })}

      {currentPage < totalPages && (
        <Link
          href={getHref(currentPage + 1)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Sonraki sayfa"
        >
          <FiChevronRight className="w-5 h-5" />
        </Link>
      )}
    </nav>
  )
}

'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">⚠️</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">500</h1>
        <h2 className="text-xl text-gray-600 mb-4">Bir hata oluştu</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Üzgünüz, bir şeyler yanlış gitti. Lütfen tekrar deneyin.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            Tekrar Dene
          </button>
          <Link href="/" className="btn-outline">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}

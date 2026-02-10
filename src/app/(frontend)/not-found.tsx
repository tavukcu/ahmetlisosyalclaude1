import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-xl text-gray-600 mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Ana Sayfaya Dön
          </Link>
          <Link href="/haber" className="btn-outline">
            Haberler
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-down" style={{ animationDirection: 'reverse', animationFillMode: 'forwards' }}>
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz.
          Detaylı bilgi için{' '}
          <a href="#" className="text-primary-600 font-semibold hover:underline">KVKK Aydınlatma Metni</a>
          &apos;ni inceleyebilirsiniz.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 btn-primary text-sm py-2.5"
          >
            Kabul Et
          </button>
          <button
            onClick={handleReject}
            className="flex-1 btn-outline text-sm py-2.5"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  )
}

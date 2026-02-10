'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookie_consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-600 text-center sm:text-left">
          Bu web sitesi deneyiminizi geliştirmek için çerezler kullanmaktadır.
          Sitemizi kullanarak{' '}
          <a href="#" className="text-primary-600 underline">KVKK Aydınlatma Metnimizi</a>
          {' '}kabul etmiş olursunuz.
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={reject} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
            Reddet
          </button>
          <button onClick={accept} className="btn-primary text-sm">
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  )
}

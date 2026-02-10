'use client'

import { useState } from 'react'
import { FiFacebook, FiTwitter, FiLink, FiCheck } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : `${process.env.NEXT_PUBLIC_SITE_URL || ''}${url}`

  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 mr-1">Paylaş:</span>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        aria-label="WhatsApp'ta paylaş"
      >
        <FaWhatsapp className="w-4 h-4" />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Facebook'ta paylaş"
      >
        <FiFacebook className="w-4 h-4" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        aria-label="Twitter'da paylaş"
      >
        <FiTwitter className="w-4 h-4" />
      </a>

      <button
        onClick={copyLink}
        className={`p-2 rounded-lg transition-colors ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        aria-label="Linki kopyala"
      >
        {copied ? <FiCheck className="w-4 h-4" /> : <FiLink className="w-4 h-4" />}
      </button>
    </div>
  )
}

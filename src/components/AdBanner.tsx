'use client'

interface AdBannerProps {
  position: 'header-banner' | 'sidebar' | 'in-article' | 'mobile-banner' | 'footer-banner'
  ad?: {
    id: string
    name: string
    image: { url: string; alt?: string }
    link: string
  }
}

const dimensionMap = {
  'header-banner': { width: '728px', height: '90px', label: 'Reklam Alanı (728x90)' },
  'sidebar': { width: '100%', height: '250px', label: 'Reklam Alanı (300x250)' },
  'in-article': { width: '100%', height: '250px', label: 'Reklam Alanı (970x250)' },
  'mobile-banner': { width: '320px', height: '100px', label: 'Reklam Alanı (320x100)' },
  'footer-banner': { width: '100%', height: '90px', label: 'Reklam Alanı' },
}

export default function AdBanner({ position, ad }: AdBannerProps) {
  const dims = dimensionMap[position]

  const handleClick = async () => {
    if (ad?.id) {
      try {
        await fetch(`/api/ads/${ad.id}/click`, { method: 'POST' })
      } catch {
        // Silently fail
      }
    }
  }

  if (ad) {
    return (
      <div className="flex justify-center my-2">
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="block overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
          style={{ maxWidth: dims.width }}
        >
          <img
            src={ad.image.url}
            alt={ad.image.alt || ad.name}
            className="w-full h-auto"
            loading="lazy"
          />
        </a>
      </div>
    )
  }

  // Placeholder when no ad is assigned
  return (
    <div className="flex justify-center my-2">
      <div
        className="bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs"
        style={{ width: '100%', maxWidth: dims.width, height: dims.height }}
      >
        {dims.label}
      </div>
    </div>
  )
}

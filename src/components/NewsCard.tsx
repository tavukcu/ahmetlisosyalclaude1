'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { timeAgo, getCategoryColor } from '@/lib/utils'

interface NewsCardProps {
  title: string
  slug: string
  summary: string
  coverImage?: {
    url?: string
    alt?: string
    sizes?: {
      card?: { url?: string }
      thumbnail?: { url?: string }
    }
  }
  category?: {
    name: string
    slug: string
    color?: string
  }
  publishedAt?: string
  viewCount?: number
  featured?: boolean
  index?: number
}

export default function NewsCard({
  title,
  slug,
  summary,
  coverImage,
  category,
  publishedAt,
  viewCount,
  featured = false,
  index = 0,
}: NewsCardProps) {
  const imageUrl = coverImage?.sizes?.card?.url || coverImage?.url || '/placeholder-news.jpg'
  const imageAlt = coverImage?.alt || title

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="news-card group"
      >
        <Link href={`/haber/${slug}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              {coverImage?.url ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              ) : (
                <div className="text-gray-400 text-6xl">📰</div>
              )}
            </div>
            {category && (
              <span
                className="category-badge absolute top-4 left-4"
                style={{ backgroundColor: getCategoryColor(category.color) }}
              >
                {category.name}
              </span>
            )}
          </div>
          <div className="p-5">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
              {title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {summary}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              {publishedAt && <span>{timeAgo(publishedAt)}</span>}
              {viewCount !== undefined && viewCount > 0 && (
                <span>{viewCount} görüntülenme</span>
              )}
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="news-card group"
    >
      <Link href={`/haber/${slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            {coverImage?.url ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            ) : (
              <div className="text-gray-400 text-4xl">📰</div>
            )}
          </div>
          {category && (
            <span
              className="category-badge absolute top-3 left-3"
              style={{ backgroundColor: getCategoryColor(category.color) }}
            >
              {category.name}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1.5">
            {title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-2">
            {summary}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {publishedAt && <span>{timeAgo(publishedAt)}</span>}
            {viewCount !== undefined && viewCount > 0 && (
              <span>{viewCount} görüntülenme</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

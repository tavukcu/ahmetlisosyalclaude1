'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { timeAgo, getCategoryColor } from '@/lib/utils'
import { FiEye, FiClock } from 'react-icons/fi'

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
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              {coverImage?.url ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              ) : (
                <div className="text-gray-300 text-7xl">📰</div>
              )}
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {category && (
              <span
                className="category-badge absolute top-4 left-4 shadow-lg"
                style={{ backgroundColor: getCategoryColor(category.color) }}
              >
                {category.name}
              </span>
            )}
            {/* Title overlay on image for featured */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-white line-clamp-2 mb-2 drop-shadow-lg">
                {title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-white/80">
                {publishedAt && (
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {timeAgo(publishedAt)}
                  </span>
                )}
                {viewCount !== undefined && viewCount > 0 && (
                  <span className="flex items-center gap-1">
                    <FiEye className="w-3 h-3" />
                    {viewCount} görüntülenme
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="p-5">
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {summary}
            </p>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="news-card group"
    >
      <Link href={`/haber/${slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            {coverImage?.url ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            ) : (
              <div className="text-gray-300 text-5xl">📰</div>
            )}
          </div>
          {category && (
            <span
              className="category-badge absolute top-3 left-3 shadow-md"
              style={{ backgroundColor: getCategoryColor(category.color) }}
            >
              {category.name}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2 mb-2 leading-snug">
            {title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed">
            {summary}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {publishedAt && (
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {timeAgo(publishedAt)}
              </span>
            )}
            {viewCount !== undefined && viewCount > 0 && (
              <span className="flex items-center gap-1">
                <FiEye className="w-3 h-3" />
                {viewCount}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

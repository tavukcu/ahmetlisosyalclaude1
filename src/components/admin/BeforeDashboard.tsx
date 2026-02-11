import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function getStats() {
  try {
    const payload = await getPayload({ config: configPromise })
    const [news, published, categories, media, ads, polls] = await Promise.all([
      payload.count({ collection: 'news' }),
      payload.count({ collection: 'news', where: { status: { equals: 'published' } } }),
      payload.count({ collection: 'categories' }),
      payload.count({ collection: 'media' }),
      payload.count({ collection: 'ads' }),
      payload.count({ collection: 'polls' }),
    ])
    return {
      news: news.totalDocs,
      published: published.totalDocs,
      categories: categories.totalDocs,
      media: media.totalDocs,
      ads: ads.totalDocs,
      polls: polls.totalDocs,
    }
  } catch {
    return null
  }
}

const StatCard = ({
  icon,
  label,
  value,
  subValue,
  subLabel,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: number
  subValue?: number
  subLabel?: string
  color: string
}) => (
  <div
    style={{
      background: 'var(--theme-elevation-50, #fff)',
      border: '1px solid var(--theme-elevation-150, #e5e7eb)',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: '1 1 160px',
      minWidth: '140px',
      transition: 'box-shadow 0.2s ease',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
    </div>
    <div>
      <div
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--theme-text, #111827)',
          lineHeight: 1,
          marginBottom: '4px',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '13px',
          color: 'var(--theme-elevation-500, #6b7280)',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      {subValue !== undefined && subLabel && (
        <div
          style={{
            marginTop: '6px',
            fontSize: '12px',
            color: '#059669',
            fontWeight: 600,
          }}
        >
          {subValue} {subLabel}
        </div>
      )}
    </div>
  </div>
)

export default async function BeforeDashboard() {
  const stats = await getStats()

  if (!stats) return null

  const publishRate =
    stats.news > 0 ? Math.round((stats.published / stats.news) * 100) : 0

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Hoşgeldiniz başlığı */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0E4D3D 0%, #1a7a5e 50%, #15803d 100%)',
          borderRadius: '16px',
          padding: '28px 32px',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            right: '80px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            Ahmetli Sosyal
          </div>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 6px 0',
            }}
          >
            Yönetim Paneline Hoş Geldiniz
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
            }}
          >
            Tüm içeriklerinizi buradan yönetebilirsiniz.
            {stats.news > 0 && (
              <> Yayınlanma oranınız <strong style={{ color: '#fff' }}>{publishRate}%</strong>.</>
            )}
          </p>
        </div>
      </div>

      {/* İstatistik kartları */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <StatCard
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12h6M9 16h6M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          }
          label="Toplam Haber"
          value={stats.news}
          subValue={stats.published}
          subLabel="yayında"
          color="rgba(14, 77, 61, 0.9)"
        />
        <StatCard
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="Kategori"
          value={stats.categories}
          color="rgba(124, 58, 237, 0.9)"
        />
        <StatCard
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="Medya"
          value={stats.media}
          color="rgba(2, 132, 199, 0.9)"
        />
        <StatCard
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="Reklam"
          value={stats.ads}
          color="rgba(217, 119, 6, 0.9)"
        />
        <StatCard
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="Anket"
          value={stats.polls}
          color="rgba(220, 38, 38, 0.9)"
        />
      </div>
    </div>
  )
}

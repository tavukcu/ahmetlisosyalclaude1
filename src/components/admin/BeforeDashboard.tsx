import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function getStats() {
  try {
    const payload = await getPayload({ config: configPromise })
    const [news, published, draft, categories, media, ads, polls, recentNews, topNews] = await Promise.all([
      payload.count({ collection: 'news' }),
      payload.count({ collection: 'news', where: { status: { equals: 'published' } } }),
      payload.count({ collection: 'news', where: { status: { equals: 'draft' } } }),
      payload.count({ collection: 'categories' }),
      payload.count({ collection: 'media' }),
      payload.count({ collection: 'ads' }),
      payload.count({ collection: 'polls' }),
      payload.find({
        collection: 'news',
        limit: 5,
        sort: '-createdAt',
        select: { title: true, status: true, createdAt: true },
      }),
      payload.find({
        collection: 'news',
        limit: 5,
        sort: '-viewCount',
        where: { status: { equals: 'published' } },
        select: { title: true, viewCount: true, publishedAt: true },
      }),
    ])
    return {
      news: news.totalDocs,
      published: published.totalDocs,
      draft: draft.totalDocs,
      categories: categories.totalDocs,
      media: media.totalDocs,
      ads: ads.totalDocs,
      polls: polls.totalDocs,
      recentNews: recentNews.docs as Array<{
        id: string
        title: string
        status: string
        createdAt: string
      }>,
      topNews: topNews.docs as Array<{
        id: string
        title: string
        viewCount: number
        publishedAt: string
      }>,
    }
  } catch {
    return null
  }
}

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { label: string; bg: string; color: string }> = {
    published: { label: 'Yayında', bg: '#dcfce7', color: '#166534' },
    draft: { label: 'Taslak', bg: '#fef9c3', color: '#854d0e' },
    archived: { label: 'Arşiv', bg: '#f3f4f6', color: '#4b5563' },
  }
  const c = config[status] ?? { label: status, bg: '#f3f4f6', color: '#4b5563' }
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '99px',
        fontSize: '11px',
        fontWeight: 600,
        background: c.bg,
        color: c.color,
        flexShrink: 0,
      }}
    >
      {c.label}
    </span>
  )
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
      background: 'var(--theme-elevation-0, #fff)',
      border: '1px solid var(--theme-elevation-150, #e5e7eb)',
      borderRadius: '14px',
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      flex: '1 1 150px',
      minWidth: '130px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}
  >
    <div
      style={{
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 10px ${color.replace('0.9', '0.3')}`,
      }}
    >
      {icon}
    </div>
    <div>
      <div
        style={{
          fontSize: '30px',
          fontWeight: 800,
          color: 'var(--theme-text, #111827)',
          lineHeight: 1,
          marginBottom: '4px',
          letterSpacing: '-1px',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '12.5px',
          color: 'var(--theme-elevation-500, #6b7280)',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      {subValue !== undefined && subLabel && (
        <div
          style={{
            marginTop: '8px',
            fontSize: '11.5px',
            color: '#059669',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
            }}
          />
          {subValue} {subLabel}
        </div>
      )}
    </div>
  </div>
)

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffH = Math.floor(diffMs / 3600000)
  const diffD = Math.floor(diffMs / 86400000)
  if (diffH < 1) return 'Az önce'
  if (diffH < 24) return `${diffH} saat önce`
  if (diffD < 7) return `${diffD} gün önce`
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}

export default async function BeforeDashboard() {
  const stats = await getStats()
  if (!stats) return null

  const publishRate = stats.news > 0 ? Math.round((stats.published / stats.news) * 100) : 0

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* ── Hero Banner ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0E4D3D 0%, #1a7a5e 55%, #15803d 100%)',
          borderRadius: '18px',
          padding: '32px 36px',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dekor daireler */}
        {[
          { top: '-30px', right: '-30px', size: '160px', opacity: 0.07 },
          { top: '20px', right: '140px', size: '60px', opacity: 0.05 },
          { bottom: '-40px', right: '40px', size: '120px', opacity: 0.05 },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: s.top,
              right: s.right,
              bottom: s.bottom,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: `rgba(255,255,255,${s.opacity})`,
              pointerEvents: 'none',
            }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.65)',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Ahmetli Sosyal · Yönetim Paneli
              </div>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#fff',
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.5px',
                }}
              >
                Hoş Geldiniz 👋
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                Tüm içeriklerinizi buradan kolayca yönetebilirsiniz.
              </p>
            </div>

            {/* Yayınlanma Oranı */}
            <div
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '16px 20px',
                minWidth: '150px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                  marginBottom: '6px',
                  letterSpacing: '0.3px',
                }}
              >
                Yayınlanma Oranı
              </div>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: '8px',
                  letterSpacing: '-1px',
                }}
              >
                {publishRate}%
              </div>
              {/* Progress bar */}
              <div
                style={{
                  height: '4px',
                  borderRadius: '99px',
                  background: 'rgba(255,255,255,0.2)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${publishRate}%`,
                    borderRadius: '99px',
                    background: publishRate > 60 ? '#4ade80' : publishRate > 30 ? '#facc15' : '#f87171',
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: '6px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {stats.published}/{stats.news} haber
              </div>
            </div>
          </div>

          {/* Hızlı Eylemler */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '20px',
            }}
          >
            {[
              { href: '/admin/collections/news/create', label: '+ Haber Ekle' },
              { href: '/admin/collections/media/create', label: '+ Medya Yükle' },
              { href: '/admin/collections/categories/create', label: '+ Kategori' },
              { href: '/admin/collections/ads/create', label: '+ Reklam' },
            ].map((a) => (
              <a
                key={a.href}
                href={a.href}
                style={{
                  display: 'inline-block',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  backdropFilter: 'blur(4px)',
                  letterSpacing: '0.1px',
                }}
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Taslak Uyarısı ── */}
      {stats.draft > 0 && (
        <a
          href="/admin/collections/news?where[status][equals]=draft"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '16px',
            textDecoration: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '9px',
                background: 'rgba(217,119,6,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>
                {stats.draft} taslak haber yayına alınmayı bekliyor
              </div>
              <div style={{ fontSize: '11.5px', color: '#b45309', marginTop: '2px' }}>
                Haberleri inceleyip durumunu "Yayında" olarak güncelleyin
              </div>
            </div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#d97706', whiteSpace: 'nowrap' }}>
            İncele →
          </span>
        </a>
      )}

      {/* ── İstatistik Kartları ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <StatCard
          icon={
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
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
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="Taslak"
          value={stats.draft}
          color="rgba(217, 119, 6, 0.9)"
        />
        <StatCard
          icon={
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
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
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
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
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
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
        <StatCard
          icon={
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="Reklam"
          value={stats.ads}
          color="rgba(236, 72, 153, 0.9)"
        />
      </div>

      {/* ── Son Eklenen Haberler ── */}
      {stats.recentNews.length > 0 && (
        <div
          style={{
            background: 'var(--theme-elevation-0, #fff)',
            border: '1px solid var(--theme-elevation-150, #e5e7eb)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid var(--theme-elevation-100, #f3f4f6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  background: 'rgba(14, 77, 61, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#0E4D3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: 'var(--theme-text, #111827)',
                }}
              >
                Son Eklenen Haberler
              </span>
            </div>
            <a
              href="/admin/collections/news"
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#0E4D3D',
                textDecoration: 'none',
              }}
            >
              Tümünü Gör →
            </a>
          </div>

          <div>
            {stats.recentNews.map((item, idx) => (
              <a
                key={item.id}
                href={`/admin/collections/news/${item.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 20px',
                  borderBottom:
                    idx < stats.recentNews.length - 1
                      ? '1px solid var(--theme-elevation-100, #f3f4f6)'
                      : 'none',
                  textDecoration: 'none',
                  gap: '12px',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--theme-elevation-50, #f9fafb)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--theme-elevation-100, #f3f4f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--theme-elevation-500, #6b7280)',
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: 'var(--theme-text, #111827)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--theme-elevation-400, #9ca3af)',
                      marginTop: '2px',
                    }}
                  >
                    {formatDate(item.createdAt)}
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── En Çok Okunan Haberler ── */}
      {stats.topNews.length > 0 && (
        <div
          style={{
            background: 'var(--theme-elevation-0, #fff)',
            border: '1px solid var(--theme-elevation-150, #e5e7eb)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            marginTop: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid var(--theme-elevation-100, #f3f4f6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  background: 'rgba(220, 38, 38, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    stroke="#dc2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    stroke="#dc2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: 'var(--theme-text, #111827)',
                }}
              >
                En Çok Okunan Haberler
              </span>
            </div>
          </div>

          <div>
            {stats.topNews.map((item, idx) => (
              <a
                key={item.id}
                href={`/admin/collections/news/${item.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 20px',
                  borderBottom:
                    idx < stats.topNews.length - 1
                      ? '1px solid var(--theme-elevation-100, #f3f4f6)'
                      : 'none',
                  textDecoration: 'none',
                  gap: '12px',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--theme-elevation-50, #f9fafb)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: idx === 0 ? 'rgba(220,38,38,0.1)' : idx === 1 ? 'rgba(217,119,6,0.1)' : 'var(--theme-elevation-100, #f3f4f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: idx === 0 ? '#dc2626' : idx === 1 ? '#d97706' : 'var(--theme-elevation-500, #6b7280)',
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: 'var(--theme-text, #111827)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--theme-elevation-400, #9ca3af)',
                      marginTop: '2px',
                    }}
                  >
                    {item.publishedAt ? formatDate(item.publishedAt) : ''}
                  </div>
                </div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    borderRadius: '99px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: 'rgba(14, 77, 61, 0.08)',
                    color: '#0E4D3D',
                    flexShrink: 0,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {item.viewCount ?? 0}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

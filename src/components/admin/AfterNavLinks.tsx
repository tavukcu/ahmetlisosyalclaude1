'use client'

import React from 'react'

const QuickLink = ({
  href,
  icon,
  label,
  color,
}: {
  href: string
  icon: React.ReactNode
  label: string
  color: string
}) => (
  <a
    href={href}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '7px 10px',
      borderRadius: '7px',
      textDecoration: 'none',
      color: 'var(--theme-elevation-700, #374151)',
      fontSize: '13px',
      fontWeight: 500,
      transition: 'background 0.15s ease, color 0.15s ease',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget
      el.style.background = color
      el.style.color = '#fff'
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget
      el.style.background = 'transparent'
      el.style.color = 'var(--theme-elevation-700, #374151)'
    }}
  >
    <span
      style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        background: color,
        flexShrink: 0,
      }}
    >
      {icon}
    </span>
    {label}
  </a>
)

export default function AfterNavLinks() {
  return (
    <div
      style={{
        marginTop: '12px',
        padding: '0 8px',
        borderTop: '1px solid var(--theme-elevation-150, #e5e7eb)',
        paddingTop: '12px',
      }}
    >
      <div
        style={{
          fontSize: '10px',
          fontWeight: 700,
          color: 'var(--theme-elevation-400, #9ca3af)',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          padding: '0 10px 6px',
        }}
      >
        Hızlı Erişim
      </div>

      <QuickLink
        href="/admin/collections/news/create"
        color="rgba(14, 77, 61, 0.85)"
        label="Yeni Haber Ekle"
        icon={
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        }
      />

      <QuickLink
        href="/admin/collections/media/create"
        color="rgba(2, 132, 199, 0.85)"
        label="Medya Yükle"
        icon={
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />

      <QuickLink
        href="/admin/collections/categories/create"
        color="rgba(124, 58, 237, 0.85)"
        label="Kategori Ekle"
        icon={
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />

      <QuickLink
        href="/admin/globals/settings"
        color="rgba(107, 114, 128, 0.85)"
        label="Site Ayarları"
        icon={
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              stroke="white"
              strokeWidth="1.8"
            />
          </svg>
        }
      />

      {/* Siteye git */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          margin: '10px 10px 0',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px dashed var(--theme-elevation-200, #e5e7eb)',
          textDecoration: 'none',
          color: 'var(--theme-elevation-500, #6b7280)',
          fontSize: '12px',
          fontWeight: 600,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.borderColor = '#0E4D3D'
          el.style.color = '#0E4D3D'
          el.style.background = 'rgba(14,77,61,0.04)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.borderColor = 'var(--theme-elevation-200, #e5e7eb)'
          el.style.color = 'var(--theme-elevation-500, #6b7280)'
          el.style.background = 'transparent'
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Siteyi Görüntüle
      </a>
    </div>
  )
}

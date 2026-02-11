import React from 'react'

export default function BeforeLogin() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '28px',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #0E4D3D 0%, #1a7a5e 60%, #15803d 100%)',
          boxShadow: '0 8px 24px rgba(14, 77, 61, 0.35)',
          marginBottom: '16px',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6h16M4 10h10M4 14h12M4 18h8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Site adı */}
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#111827',
          margin: '0 0 6px 0',
          letterSpacing: '-0.5px',
        }}
      >
        Ahmetli Sosyal
      </h1>
      <p
        style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '0 0 4px 0',
          fontWeight: 500,
        }}
      >
        Yönetim Paneli
      </p>

      {/* Ayırıcı çizgi */}
      <div
        style={{
          width: '40px',
          height: '3px',
          background: 'linear-gradient(90deg, #0E4D3D, #1a7a5e)',
          borderRadius: '99px',
          margin: '16px auto 0',
        }}
      />
    </div>
  )
}

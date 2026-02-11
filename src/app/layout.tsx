import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Ahmetli Sosyal — Ahmetli\'nin Haber Portalı',
    template: '%s | Ahmetli Sosyal',
  },
  description: 'Ahmetli ve çevresinin en güncel haberleri, hava durumu, tarımsal bilgiler ve daha fazlası.',
  keywords: ['ahmetli', 'haber', 'manisa', 'yerel haber', 'ahmetli sosyal'],
  authors: [{ name: 'Ahmetli Sosyal' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Ahmetli Sosyal',
    title: 'Ahmetli Sosyal — Ahmetli\'nin Haber Portalı',
    description: 'Ahmetli ve çevresinin en güncel haberleri',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}

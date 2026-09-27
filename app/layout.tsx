import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://time2coin.vercel.app'),
  title: 'time2coin – Trade Skills & Get Food Without Cash',
  description: 'Trade skills with neighbours and rescue fresh restaurant surplus meals with zero cash.',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'time2coin – Trade Skills & Get Food Without Cash',
    description: 'Trade skills with neighbours and rescue fresh restaurant surplus meals with zero cash.',
    url: 'https://time2coin.vercel.app',
    siteName: 'time2coin',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
};

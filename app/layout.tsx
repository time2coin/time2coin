import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://time2coin.vercel.app'),
  title: 'time2coin – Trade Skills & Get Food Without Cash | Community Time Bank',
  description:
    'Trade skills with neighbours and rescue fresh restaurant surplus meals with zero cash. 1 hour = 1 hour equal time equity.',
  keywords: [
    'time bank',
    'time2coin',
    'food rescue',
    'community skill share',
    'zero cash economy',
    'p2p trade',
  ],
  authors: [{ name: 'time2coin Team' }],
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
    description:
      'Trade skills with neighbours and rescue fresh restaurant surplus meals with zero cash. 1 hour = 1 hour equal time equity.',
    url: 'https://time2coin.vercel.app',
    siteName: 'time2coin',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'time2coin – Community Time Bank & Food Rescue Network',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'time2coin – Trade Skills & Get Food Without Cash',
    description:
      'Trade skills with neighbours and rescue fresh restaurant surplus meals with zero cash.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

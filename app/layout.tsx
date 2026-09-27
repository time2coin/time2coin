import type { Metadata } from 'next';
import './globals.css'; // Make sure this matches your CSS import

export const metadata: Metadata = {
  // Sets the base URL so relative image paths work everywhere
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
  openGraph: {
    title: 'time2coin – Trade Skills & Get Food Without Cash',
    description:
      'Trade skills with neighbours and rescue fresh restaurant surplus meals with zero cash. 1 hour = 1 hour equal time equity.',
    url: 'https://time2coin.vercel.app',
    siteName: 'time2coin',
    images: [
      {
        url: '/og-image.png', // Placed inside your /public folder (1200x630)
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

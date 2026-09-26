import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'time2coin – Trade Skills & Get Food Without Cash | Community Time Bank',
  description: 'Trade skills with neighbors and rescue fresh restaurant surplus meals with zero cash. 1 hour = 1 hour equal time equity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

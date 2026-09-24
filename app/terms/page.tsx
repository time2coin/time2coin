'use client';

import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <header className="max-w-4xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <a href="/" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </a>
          <div>
            <h1 className="text-xl font-bold text-white">time2coin Mission & Terms</h1>
            <p className="text-xs text-slate-400">Non-Monetary Peer Exchange Policy</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs text-slate-300 leading-relaxed">
        <h2 className="text-sm font-bold text-white">1. Universal Time Equity (1 Hour = 1 Hour)</h2>
        <p>Every member's labor hour is valued equally regardless of skill domain. Time coins carry no monetary debt obligation and function strictly as community service credits.</p>
      </main>
    </div>
  );
}

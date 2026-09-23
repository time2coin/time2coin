'use client';

import React from 'react';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-amber-400 mb-2">Terms & Conditions</h1>
      <p className="text-xs text-slate-400 mb-8">Effective Date: September 2026 | time2coin Social Enterprise</p>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-amber-300 mb-2">1. Peer Time Bankers (1 Hour = 1 Hour)</h2>
          <p>time2coin operates on strict non-monetary time equity. All skills traded between peers are valued equally at 1 hour credit. Automated keyword screening blocks illicit substances, contraband, or illegal trades.</p>
        </section>

        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-amber-300 mb-2">2. Participating Merchants & Food Waste Rescue</h2>
          <p>Restaurants offering food surplus trades enforce a 4.5★ worker trust threshold. Merchants crossing the 500 Time Coin threshold become eligible for CSR cash pool redemptions.</p>
        </section>

        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-amber-300 mb-2">3. Corporate Sponsors & Dignity-First Privacy</h2>
          <p>Donations are split into an 88% Net Impact Pool and a 12% Platform Admin Fee. Beneficiary user identities are pseudonymized to protect human dignity, while merchant contacts remain 100% auditable.</p>
        </section>
      </div>
    </div>
  );
}

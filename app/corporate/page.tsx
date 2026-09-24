'use client';

import React from 'react';
import { Building2, ArrowLeft, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function CorporateCSRPortal() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <a href="/" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </a>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Building2 className="w-7 h-7 text-blue-400" /> Corporate ESG Sponsor Portal
            </h1>
            <p className="text-xs text-slate-400">Micro-Donation Vault & Pseudonymous Impact Reporting</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-center space-y-4">
          <HeartHandshake className="w-12 h-12 text-blue-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">$1.00 = 1 Surplus Meal Rescued + 1 Hour Community Care</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">Corporate CSR micro-donations directly fund merchant cash reimbursements while mobilizing local volunteer services with zero overhead leakage.</p>
        </div>
      </main>
    </div>
  );
}

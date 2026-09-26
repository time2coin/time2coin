'use client';

import React, { useState } from 'react';
import { 
  Building2, Award, ShieldCheck, ArrowRight, CheckCircle2, 
  Sparkles, FileText, TrendingUp, Users, Heart, Globe, LogIn
} from 'lucide-react';

export default function CorporateCSRPage() {
  const [submitted, setSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [sponsorshipTier, setSponsorshipTier] = useState('$5,000 / mo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="p-1 bg-blue-500/20 border border-blue-500/40 rounded-xl">
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-bold text-lg text-white">time2coin <span className="text-blue-400 text-xs font-normal">| Corporate CSR Portal</span></span>
          </a>
          <a href="/auth" className="px-4 py-1.5 bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-blue-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
            <LogIn className="w-3.5 h-3.5" /> Sponsor Sign In
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/50 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/60 px-4 py-1 rounded-full text-xs font-bold text-blue-300">
            <Award className="w-4 h-4 text-blue-400" /> Double-Impact ESG & Corporate Social Responsibility
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Fund Community Care & <span className="text-blue-400">Audited ESG Impact</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Designed for enterprise sponsors and ESG officers. Sponsor community time pools to deliver verified $1 = 1 Surplus Meal + 1 Hour Care impact multiplier with full audit receipts.
          </p>
        </div>
      </section>

      {/* CSR IMPACT METRICS SHOWCASE */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Audited ESG Disclosures</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated PDF generation of verified social impact metrics for corporate annual sustainability reporting.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Double-Impact Multiplier</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every $1 sponsored simultaneously rescues 1 surplus meal and mobilizes 1 hour of neighborly care.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Employee Volunteer Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engage corporate staff in skill-sharing initiatives matched by sponsored company Time Pool credits.
            </p>
          </div>
        </div>

        {/* CSR SPONSORSHIP FORM */}
        <div className="bg-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-white">Sponsor a Community CSR Time Pool</h2>
            <p className="text-xs text-slate-400">Partner with time2coin to power hyper-local social impact.</p>
          </div>

          {submitted ? (
            <div className="p-6 bg-blue-950/60 border border-blue-800 text-blue-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-blue-400 mx-auto" />
              <h3 className="font-bold text-base text-white">Sponsorship Inquiry Received!</h3>
              <p className="text-xs text-slate-300">
                Thank you, <strong>{companyName}</strong>. Our CSR Partnership Director will contact your office with a customized ESG proposal within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Foundation Name</label>
                <input 
                  type="text" 
                  required 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                  placeholder="e.g. Acme Global Foundation" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly CSR Pool Budget</label>
                <select 
                  value={sponsorshipTier} 
                  onChange={(e) => setSponsorshipTier(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="$1,000 / mo">$1,000 / month (Local Pilot)</option>
                  <option value="$5,000 / mo">$5,000 / month (District Sponsor)</option>
                  <option value="$25,000 / mo">$25,000 / month (Citywide Impact)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
              >
                Request CSR Partnership Proposal <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

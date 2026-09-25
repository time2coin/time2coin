'use client';

import React, { useState, useEffect } from 'react';
import { Building2, ArrowLeft, HeartHandshake, ShieldCheck, LogIn, LogOut, Award, Quote, CheckCircle2 } from 'lucide-react';

export default function CorporateCSRPortal() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('time2coin_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('time2coin_user');
    setCurrentUser(null);
  };

  const corporateTestimonials = [
    {
      company: 'Acme ESG Global Foundation',
      author: 'Evelyn Reed, Corporate Impact Lead',
      quote: 'Partnering with time2coin allowed us to sponsor local surplus food rescue while simultaneously generating verifiable community care hours. The pseudonymous audit reporting gives us 100% ESG compliance transparency.',
      impact: '$50,000 Sponsored Pool'
    },
    {
      company: 'Riverdale Tech Labs',
      author: 'David Chen, CSR Director',
      quote: 'Unlike traditional charities with high administrative overhead, every $1.00 micro-donation in time2coin directly unlocks 1 surplus meal rescued and 1 hour of volunteer labor.',
      impact: '1,200 Meals Rescued'
    }
  ];

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

        {currentUser ? (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <div className="text-right">
              <span className="text-xs font-bold text-white block">{currentUser.name}</span>
              <span className="text-[10px] text-blue-400 block">{currentUser.role}</span>
            </div>
            <button onClick={handleLogout} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition ml-1" title="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <a href="/auth" className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5">
            <LogIn className="w-3.5 h-3.5" /> Corporate Login
          </a>
        )}
      </header>

      <main className="max-w-5xl mx-auto space-y-6">
        {/* HERO MULTIPLIER BANNER */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-center space-y-4">
          <HeartHandshake className="w-12 h-12 text-blue-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">$1.00 = 1 Surplus Meal Rescued + 1 Hour Community Care</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">Corporate CSR micro-donations directly fund merchant cash reimbursements while mobilizing local volunteer services with zero overhead leakage.</p>
        </div>

        {/* CORPORATE & DONOR TESTIMONIALS */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Corporate Social Proof</span>
              <h3 className="text-base font-bold text-white mt-0.5">ESG Sponsor & Donor Testimonials</h3>
            </div>
            <span className="text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-full">
              Verified CSR Impact
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {corporateTestimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-blue-500/40" />
                  <p className="text-xs text-slate-300 leading-relaxed italic">"{t.quote}"</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs">{t.company}</h4>
                    <span className="text-[10px] text-slate-400 block">{t.author}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800 px-2.5 py-1 rounded-full">
                    {t.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

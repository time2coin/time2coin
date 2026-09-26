'use client';

import React, { useState } from 'react';
import { 
  Heart, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, 
  Users, HandCoins, Shield, LogIn, DollarSign
} from 'lucide-react';

export default function PrivateDonorsPage() {
  const [donated, setDonated] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('100');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonated(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="p-1 bg-rose-500/20 border border-rose-500/40 rounded-xl">
              <Heart className="w-5 h-5 text-rose-400" />
            </div>
            <span className="font-bold text-lg text-white">time2coin <span className="text-rose-400 text-xs font-normal">| Private Donors Portal</span></span>
          </a>
          <a href="/auth" className="px-4 py-1.5 bg-slate-900 border border-slate-800 hover:border-rose-500/50 text-rose-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
            <LogIn className="w-3.5 h-3.5" /> Patron Sign In
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/40 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-800/60 px-4 py-1 rounded-full text-xs font-bold text-rose-300">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" /> Dignity-First Private Patronage
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Sponsor Mutual Aid for <span className="text-rose-400">Vulnerable Neighbors</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Targeted for individual patrons and philanthropists. Fund the 4% Mutual Aid Reserve Pool to subsidize Time Minutes for low-income seniors and families—giving them access to food and essential care with total dignity.
          </p>
        </div>
      </section>

      {/* THREE DONOR ADVANTAGES */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">100% Traceable Mutual Aid</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every dollar directly backs the community reserve pool, backing senior care passes and emergency meal redemptions.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Dignity-First Assistance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Beneficiaries receive credits in their personal Time Wallet, removing the stigma associated with conventional food banks.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
              <HandCoins className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Pseudonymous Impact Receipts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive private monthly impact receipts highlighting real care delivered to community members while protecting recipient privacy.
            </p>
          </div>
        </div>

        {/* DONATION FORM */}
        <div className="bg-slate-900 border border-rose-800/40 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-white">Sponsor the Mutual Aid Reserve Pool</h2>
            <p className="text-xs text-slate-400">Choose a sponsorship amount to power neighborhood care.</p>
          </div>

          {donated ? (
            <div className="p-6 bg-rose-950/60 border border-rose-800 text-rose-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-rose-400 mx-auto" />
              <h3 className="font-bold text-base text-white">Thank You, {donorName || 'Generous Patron'}!</h3>
              <p className="text-xs text-slate-300">
                Your donation of <strong>\${amount}</strong> has been credited to the local Mutual Aid Pool, unlocking <strong>{Number(amount) * 60} Time Minutes</strong> of community care and food rescue.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name / Organization (Optional)</label>
                <input 
                  type="text" 
                  value={donorName} 
                  onChange={(e) => setDonorName(e.target.value)} 
                  placeholder="e.g. Dr. Aris Thorne" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sponsorship Contribution (\$ USD)</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['25', '50', '100', '500'].map((val) => (
                    <button 
                      key={val} 
                      type="button" 
                      onClick={() => setAmount(val)} 
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        amount === val 
                          ? 'bg-rose-600 text-white border-rose-500' 
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      \${val}
                    </button>
                  ))}
                </div>
                <input 
                  type="number" 
                  required 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="100" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
              >
                Sponsor Mutual Aid Pool <Heart className="w-4 h-4 fill-white" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, 
  Users, HandCoins, Shield, LogIn, DollarSign
} from 'lucide-react';

export default function PrivateDonorsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [amount, setAmount] = useState('100');
  const [donated, setDonated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('time2coin_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      window.location.href = '/auth';
      return;
    }
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
          
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
              <span className="text-xs font-bold text-rose-300">{currentUser.name} (Patron)</span>
            </div>
          ) : (
            <a href="/auth" className="px-4 py-1.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md">
              <LogIn className="w-3.5 h-3.5" /> Register / Sign In
            </a>
          )}
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
            Targeted for individual patrons and philanthropists. Register as a patron to fund the 4% Mutual Aid Reserve Pool, subsidizing Time Minutes for seniors and families with 100% transparent ledger tracking.
          </p>
        </div>
      </section>

      {/* VALUE PROPOSITIONS */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">100% Traceable Mutual Aid</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every dollar directly backs the community reserve pool, funding senior care passes and emergency meal redemptions.
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
            <h3 className="font-bold text-white text-base">Transparent Patron Ledger</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Registered patrons receive pseudonymous impact receipts showing real care delivered to community members.
            </p>
          </div>
        </div>

        {/* CONDITIONALLY RENDERED DONATION FORM VS REGISTRATION GATE */}
        <div className="bg-slate-900 border border-rose-800/40 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl space-y-6">
          {currentUser ? (
            /* LOGGED-IN PATRON DASHBOARD */
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20" /> Sponsor Mutual Aid Reserve Pool
              </h2>

              {donated ? (
                <div className="p-6 bg-rose-950/60 border border-rose-800 text-rose-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-rose-400 mx-auto" />
                  <h3 className="font-bold text-base text-white">Thank You, {currentUser.name}!</h3>
                  <p className="text-xs text-slate-300">
                    Your contribution of <strong>\${amount}</strong> has been credited to the Mutual Aid Pool, unlocking <strong>{Number(amount) * 60} Time Minutes</strong> of community care and food rescue.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDonate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Select Patron Contribution (\$ USD)</label>
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
          ) : (
            /* LOGGED-OUT PROMPT FOR REGISTRATION */
            <div className="text-center space-y-4 py-4">
              <Heart className="w-12 h-12 text-rose-400 mx-auto" />
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Patron Registration Required</h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  To ensure 100% fund transparency and provide pseudonymous impact receipts, patrons must sign in or register an account first.
                </p>
              </div>

              <a 
                href="/auth" 
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-xl"
              >
                Register / Sign In as Patron Donor <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

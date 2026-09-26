'use client';

import React, { useState } from 'react';
import { 
  Utensils, Store, ArrowRight, ShieldCheck, CheckCircle2, 
  Sparkles, Clock, Leaf, QrCode, Building2, Plus, LogIn
} from 'lucide-react';

export default function MerchantPortalPage() {
  const [registered, setRegistered] = useState(false);
  const [merchantName, setMerchantName] = useState('');
  const [businessType, setMerchantType] = useState('Restaurant');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="p-1 bg-amber-500/20 border border-amber-500/40 rounded-xl">
              <Utensils className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-bold text-lg text-white">time2coin <span className="text-amber-400 text-xs font-normal">| Merchant Portal</span></span>
          </a>
          <a href="/auth" className="px-4 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
            <LogIn className="w-3.5 h-3.5" /> Partner Sign In
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-800/60 px-4 py-1 rounded-full text-xs font-bold text-amber-300">
            <Store className="w-4 h-4 text-amber-400" /> Zero Food Waste • Maximum Local Goodwill
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Turn Surplus Food into <span className="text-amber-400">Community Goodwill</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Targeted for local restaurants, cafes, and bakeries. List fresh daily surplus meals on time2coin to attract loyal new neighborhood customers—all with zero cash transaction fees.
          </p>
        </div>
      </section>

      {/* THREE VALUE PROPOSITIONS */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Eliminate Commercial Waste</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Divert unsold chef-prepared meals and artisan goods from landfills while recovering valuable kitchen preparation costs.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Attract New Foot Traffic</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Neighbors redeeming Time Minutes discover your location, sample your cuisine, and become regular paying customers.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Verified Instant Pickup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seamless 4-digit PIN and QR code verification ensure frictionless customer pickup at your counter.
            </p>
          </div>
        </div>

        {/* REGISTRATION FORM */}
        <div className="bg-slate-900 border border-amber-800/40 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-white">Register Your Restaurant / Food Store</h2>
            <p className="text-xs text-slate-400">Join our merchant rescue network today in under 2 minutes.</p>
          </div>

          {registered ? (
            <div className="p-6 bg-amber-950/60 border border-amber-800 text-amber-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="font-bold text-base text-white">Merchant Application Received!</h3>
              <p className="text-xs text-slate-300">
                Thank you, <strong>{merchantName}</strong>. Our local community coordinator will verify your food license and activate your portal within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Business Name</label>
                <input 
                  type="text" 
                  required 
                  value={merchantName} 
                  onChange={(e) => setMerchantName(e.target.value)} 
                  placeholder="e.g. Green Garden Bistro" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Establishment Type</label>
                  <select 
                    value={businessType} 
                    onChange={(e) => setMerchantType(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Restaurant">Restaurant / Bistro</option>
                    <option value="Bakery">Bakery / Cafe</option>
                    <option value="Grocery">Grocery Store</option>
                    <option value="Caterer">Catering Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Business Email</label>
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="partner@restaurant.com" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
              >
                Submit Merchant Registration <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

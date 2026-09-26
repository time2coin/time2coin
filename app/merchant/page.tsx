'use client';

import React, { useState, useEffect } from 'react';
import { 
  Utensils, Store, ArrowRight, ShieldCheck, CheckCircle2, 
  Sparkles, Leaf, LogIn, Plus, Send, ArrowLeft
} from 'lucide-react';

export default function MerchantPortalPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Post Surplus Food Form State (Logged-In Merchants)
  const [foodTitle, setFoodTitle] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('5');
  const [timeValue, setTimeValue] = useState('45');
  const [pickupWindow, setPickupWindow] = useState('5:00 PM - 7:00 PM');
  const [description, setDescription] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('time2coin_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handlePostFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      window.location.href = '/auth';
      return;
    }
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setFoodTitle('');
      setDescription('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* HEADER WITH PROMINENT BACK TO HOME BUTTON */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {/* PROMINENT BACK TO HOME BUTTON */}
            <a 
              href="/" 
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" /> Back to Home
            </a>

            <a href="/" className="flex items-center gap-2">
              <div className="p-1 bg-amber-500/20 border border-amber-500/40 rounded-xl">
                <Utensils className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-bold text-lg text-white">time2coin <span className="text-amber-400 text-xs font-normal hidden sm:inline">| Merchant Portal</span></span>
            </a>
          </div>
          
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
              <span className="text-xs font-bold text-amber-300">{currentUser.name} (Verified Merchant)</span>
            </div>
          ) : (
            <a href="/auth" className="px-4 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md">
              <LogIn className="w-3.5 h-3.5" /> Register / Sign In
            </a>
          )}
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
            Targeted for local restaurants, cafes, bakeries, and grocery stores. Register as a verified merchant to list daily surplus meals, divert food from landfills, and attract new neighborhood foot traffic.
          </p>
        </div>
      </section>

      {/* VALUE PROPOSITIONS */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Eliminate Commercial Waste</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Divert unsold chef-prepared meals and artisan goods from landfills while recovering preparation costs in Time Minutes.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Attract New Foot Traffic</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Neighbors redeeming Time Minutes discover your store, sample your food, and become regular paying customers.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Verified & Transparent</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All merchant postings require verified partner registration, ensuring food safety compliance and transparent inventory tracking.
            </p>
          </div>
        </div>

        {/* CONDITIONALLY RENDERED POSTING FORM VS REGISTRATION GATE */}
        <div className="bg-slate-900 border border-amber-800/40 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl space-y-6">
          {currentUser ? (
            /* LOGGED-IN VERIFIED MERCHANT DASHBOARD */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" /> Post Surplus Food Offer
                </h2>
                <span className="text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-0.5 rounded-full">
                  Verified Merchant
                </span>
              </div>

              {postSuccess && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-2xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Surplus meal listing published live to the public marketplace!</span>
                </div>
              )}

              <form onSubmit={handlePostFood} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Meal / Item Title</label>
                  <input 
                    type="text" 
                    required 
                    value={foodTitle} 
                    onChange={(e) => setFoodTitle(e.target.value)} 
                    placeholder="e.g. 3x Gourmet Organic Lunch Boxes" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity Available</label>
                    <input 
                      type="number" 
                      required 
                      value={foodQuantity} 
                      onChange={(e) => setFoodQuantity(e.target.value)} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Time Mins Value</label>
                    <input 
                      type="number" 
                      required 
                      value={timeValue} 
                      onChange={(e) => setTimeValue(e.target.value)} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pickup Time Window</label>
                  <input 
                    type="text" 
                    required 
                    value={pickupWindow} 
                    onChange={(e) => setPickupWindow(e.target.value)} 
                    placeholder="e.g. 5:00 PM - 7:00 PM" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Item Description</label>
                  <textarea 
                    required 
                    rows={3} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Describe ingredients, dietary details (e.g. Vegan/Halal), and pickup instructions..." 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Publish Surplus Listing
                </button>
              </form>
            </div>
          ) : (
            /* LOGGED-OUT PROMPT FOR REGISTRATION */
            <div className="text-center space-y-4 py-4">
              <Store className="w-12 h-12 text-amber-400 mx-auto" />
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Merchant Registration Required</h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  To ensure food quality, safety, and inventory transparency, food listings can only be created by registered merchant accounts.
                </p>
              </div>

              <a 
                href="/auth" 
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-xl"
              >
                Register / Sign In as Merchant Partner <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

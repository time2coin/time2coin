'use client';
import React, { useState, useEffect } from 'react';
import CountrySelector from '@/components/CountrySelector';
import { SUPPORTED_JURISDICTIONS, formatLocalCurrency } from '@/lib/jurisdictions';
import { 
  Heart, ArrowLeft, LogIn, LogOut, ArrowRight, ShieldCheck, 
  CheckCircle2, Sparkles, DollarSign, Users, Award, MessageSquare, 
  Quote, Clock, SlidersHorizontal, Plus
} from 'lucide-react';

export default function PrivateDonorsPortalPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

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

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
    setTimeout(() => {
      setDonationSuccess(false);
      setCustomAmount('');
      setTestimonial('');
    }, 3000);
  };

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 lg:pb-12">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40 px-3 sm:px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a 
              href="/" 
              className="p-2 sm:px-3 sm:py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Back to Home</span>
            </a>

            <a href="/" className="flex items-center gap-2 min-w-0 truncate">
              <div className="p-1 bg-rose-500/20 border border-rose-500/40 rounded-xl shrink-0">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
              </div>
              <span className="font-bold text-sm sm:text-lg text-white truncate">time2coin <span className="text-rose-400 text-xs font-normal hidden md:inline">| Private Donors Portal</span></span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <CountrySelector userJurisdictionId={currentUser?.jurisdiction_id} />
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl shrink-0">
                <span className="text-[10px] sm:text-xs font-bold text-rose-300 truncate">{currentUser.name}</span>
                <button onClick={handleLogout} title="Sign Out" className="p-1 text-slate-400 hover:text-rose-400">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <a href="/auth" className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center gap-1 shrink-0 shadow-md">
                <LogIn className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Donor </span>Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/60 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-800/60 px-4 py-1 rounded-full text-xs font-bold text-rose-300">
            <Heart className="w-4 h-4 text-rose-400" /> Micro-Donation Test Drive ($10 to $100k)
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Direct Meal & Care <span className="text-rose-400">Impact Sponsoring</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Test drive time2coin with a small donation. Every meal pass sponsors a gourmet surplus meal and mobilizes 1 hour of community care with 100% audit transparency.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <div className="bg-slate-900 border border-rose-800/40 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white">Select Micro-Donation Amount</h2>
            <p className="text-xs text-slate-400">See direct impact breakdown before confirming.</p>
          </div>

          {donationSuccess && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-2xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Thank you for your donation! Your impact pass has been deployed to local community members.</span>
            </div>
          )}

          <form onSubmit={handleDonationSubmit} className="space-y-5">
            <div className="grid grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-2xl text-xs font-bold transition border ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Or Enter Custom Amount ($ USD)</label>
              <input 
                type="number" 
                value={customAmount} 
                onChange={(e) => setCustomAmount(e.target.value)} 
                placeholder="e.g. 250" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500" 
              />
            </div>

            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl text-xs text-rose-300 space-y-1">
              <div className="font-bold text-sm text-white">Your Impact Multiplier (${activeAmount}):</div>
              <div>• <strong>{Math.floor(activeAmount / 6)} Gourmet Meals</strong> rescued from restaurant surplus</div>
              <div>• <strong>{Math.floor(activeAmount / 6)} Hours</strong> of neighborhood eldercare/tutoring mobilized</div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required={!isAnonymous}
                  disabled={isAnonymous}
                  value={donorName} 
                  onChange={(e) => setDonorName(e.target.value)} 
                  placeholder="e.g. Marcus Tan" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 disabled:opacity-50" 
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="anon"
                  checked={isAnonymous} 
                  onChange={(e) => setIsAnonymous(e.target.checked)} 
                  className="rounded bg-slate-950 border-slate-800 text-rose-600 focus:ring-rose-500" 
                />
                <label htmlFor="anon" className="text-xs text-slate-400">Donate anonymously</label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Public Testimonial / Note (Optional)</label>
                <textarea 
                  rows={2}
                  value={testimonial} 
                  onChange={(e) => setTestimonial(e.target.value)} 
                  placeholder="Share a word of encouragement for local community members..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 resize-none" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" /> Complete ${activeAmount} Micro-Donation
            </button>
          </form>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur border-t border-slate-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-stretch justify-around px-2 pt-1.5 pb-2">
          <a href="/" className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </a>
          <a href="/#directory" className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Directory</span>
          </a>
          <a href="/#directory" className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all flex-1" title="Post Offer">
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center -mt-5 shadow-lg shadow-rose-500/40 ring-4 ring-slate-950">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-0.5">Post</span>
          </a>
          <a href="/donors" className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-rose-400 font-bold transition-all flex-1">
            <Heart className="w-5 h-5 scale-110 text-rose-400" />
            <span className="text-[10px] tracking-tight">Donors</span>
          </a>
          <a href="/auth" className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-cyan-400 transition-all flex-1">
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Account</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

import CountrySelector from "@/components/CountrySelector";
import { SUPPORTED_JURISDICTIONS, Jurisdiction } from "@/lib/jurisdictions";
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, ArrowLeft, LogIn, LogOut, ArrowRight, ShieldCheck, 
  CheckCircle2, Sparkles, Heart, FileText, Download, DollarSign,
  TrendingUp, Award, BarChart3, Users, ChevronRight, Lock, Eye,
  Clock, SlidersHorizontal, Plus
} from 'lucide-react';

export default function CorporateCSRPortalPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [grantAmount, setGrantAmount] = useState('5000');
  const [district, setDistrict] = useState('Downtown District 1');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction>(SUPPORTED_JURISDICTIONS['MY-MYR']);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    const savedId = getCookie('time2coin_jurisdiction') || currentUser?.jurisdiction_id || 'MY-MYR';
    if (SUPPORTED_JURISDICTIONS[savedId]) {
      setSelectedJurisdiction(SUPPORTED_JURISDICTIONS[savedId]);
    }
  }, [currentUser]);

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

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setCompanyName('');
      setContactEmail('');
    }, 3000);
  };

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
              <div className="p-1 bg-blue-500/20 border border-blue-500/40 rounded-xl shrink-0">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <span className="font-bold text-sm sm:text-lg text-white truncate">time2coin <span className="text-blue-400 text-xs font-normal hidden md:inline">| Corporate CSR & ESG Portal</span></span>
            </a>
          </div>

                    <CountrySelector 
            userJurisdictionId={currentUser?.jurisdiction_id} 
            onJurisdictionChange={(j) => setSelectedJurisdiction(SUPPORTED_JURISDICTIONS[j.id] || SUPPORTED_JURISDICTIONS['MY-MYR'])}
          />

          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl shrink-0">
              <span className="text-[10px] sm:text-xs font-bold text-blue-300 truncate">{currentUser.name}</span>
              <button onClick={handleLogout} title="Sign Out" className="p-1 text-slate-400 hover:text-rose-400">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <a href="/auth" className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center gap-1 shrink-0 shadow-md">
              <LogIn className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Partner </span>Sign In
            </a>
          )}
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/60 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/60 px-4 py-1 rounded-full text-xs font-bold text-blue-300">
            <Building2 className="w-4 h-4 text-blue-400" /> Verified ESG & CSR Impact Sponsoring
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Double-Impact <span className="text-blue-400">CSR Grant Sponsoring</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Fund local merchant food passes and mobilize community care hours simultaneously. 100% cryptographically audited with zero-fraud verification.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            <h3 className="font-bold text-white text-sm">Quantifiable ESG Metrics</h3>
            <p className="text-xs text-slate-400">Track exact kg of food waste rescued and hours of senior care mobilized per dollar spent.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Anti-Fraud Protection</h3>
            <p className="text-xs text-slate-400">4-digit double-blind PIN verification ensures funds reach real local beneficiaries.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
            <Award className="w-8 h-8 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Tax Receipt & Audit Export</h3>
            <p className="text-xs text-slate-400">Download automated CSV/PDF impact reports for corporate tax deduction & annual ESG reporting.</p>
          </div>
        </div>

        {/* CSR SPONSORSHIP FORM */}
        <div className="bg-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white">Allocate Corporate CSR Grant</h2>
            <p className="text-xs text-slate-400">Sponsor meal vouchers and community care in your targeted operating district.</p>
          </div>

          {successMsg && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-2xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>CSR Grant request received! Our operations auditor will send your tax receipt invoice within 2 hours.</span>
            </div>
          )}

          <form onSubmit={handleSponsorSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Foundation Name</label>
              <input 
                type="text" 
                required 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                placeholder="e.g. Petronas Corporate Sustainability Division" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target District</label>
                <select 
                  value={district} 
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Downtown District 1">Downtown District 1</option>
                  <option value="Subang Jaya District 2">Subang Jaya District 2</option>
                  <option value="Petaling Jaya District 3">Petaling Jaya District 3</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CSR Grant Budget ({selectedJurisdiction.currencySymbol} {selectedJurisdiction.currencyCode})</label>
                <input 
                  type="number" 
                  required 
                  value={grantAmount} 
                  onChange={(e) => setGrantAmount(e.target.value)} 
                  placeholder="5000" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Email</label>
              <input 
                type="email" 
                required 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                placeholder="csr@company.com" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs text-blue-300 space-y-1">
              <div className="font-bold">Impact Multiplier Preview ({selectedJurisdiction.currencySymbol}{grantAmount}):</div>
              <div>• {Math.floor(Number(grantAmount) / selectedJurisdiction.localMealCostFiat)} Gourmet Meals Sponsored for Local Seniors</div>
              <div>• {Math.floor(Number(grantAmount) / selectedJurisdiction.localMealCostFiat)} Hours of P2P Community Care Mobilized</div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" /> Submit Corporate CSR Grant
            </button>
          </form>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur border-t border-slate-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-stretch justify-around px-2 pt-1.5 pb-2">
          <a
            href="/"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1"
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </a>

          <a
            href="/#directory"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Directory</span>
          </a>

          <a
            href="/#directory"
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all flex-1"
            title="Post Offer"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center -mt-5 shadow-lg shadow-blue-500/40 ring-4 ring-slate-950">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-0.5">Post</span>
          </a>

          <a
            href="/corporate"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-blue-400 font-bold transition-all flex-1"
          >
            <Building2 className="w-5 h-5 scale-110 text-blue-400" />
            <span className="text-[10px] tracking-tight">Corporate</span>
          </a>

          <a
            href="/auth"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-cyan-400 transition-all flex-1"
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Account</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

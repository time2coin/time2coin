'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  QrCode, 
  Star, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  User, 
  Check, 
  RefreshCw,
  Sliders,
  ChevronRight
} from 'lucide-react';

// ==========================================
// TYPES & MODULE INTERFACES
// ==========================================
type TransactionStatus = 'REQUESTED' | 'ESCROW_LOCKED' | 'SERVICE_DELIVERED' | 'VERIFIED_AND_PAID' | 'RATED';

interface ServiceItem {
  id: string;
  providerName: string;
  providerRating: number;
  providerTrustScore: number;
  title: string;
  category: string;
  estimatedMinutes: number;
  description: string;
}

interface Feature5Split {
  grossMinutes: number;
  netProviderMinutes: number;
  mutualAidMinutes: number;
  maintainerMinutes: number;
}

interface ActiveTransaction {
  id: string;
  providerName: string;
  serviceTitle: string;
  grossMinutes: number;
  split: Feature5Split;
  status: TransactionStatus;
  verificationPin: string;
  createdAt: string;
}

export default function Time2CoinDashboard() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [walletBalance, setWalletBalance] = useState<number>(120); // Welcome balance in minutes
  const [activeTab, setActiveTab] = useState<'dashboard' | 'catalog' | 'escrow' | 'review'>('dashboard');

  // Available Services Catalog
  const [services] = useState<ServiceItem[]>([
    {
      id: 'srv-1',
      providerName: 'Sarah Jenkins',
      providerRating: 4.9,
      providerTrustScore: 98,
      title: 'Bicycle Chain & Brake Repair',
      category: 'Mechanical',
      estimatedMinutes: 60,
      description: 'Full brake cable adjustment, chain lubrication, and safety check.'
    },
    {
      id: 'srv-2',
      providerName: 'David Chen',
      providerRating: 4.8,
      providerTrustScore: 94,
      title: 'Organic Garden Bed Setup',
      category: 'Agriculture',
      estimatedMinutes: 90,
      description: 'Soil aerating, compost mixing, and seasonal vegetable planting.'
    },
    {
      id: 'srv-3',
      providerName: 'Elena Rostova',
      providerRating: 5.0,
      providerTrustScore: 100,
      title: 'Elder Care Assistance & Companionship',
      category: 'Caregiving',
      estimatedMinutes: 120,
      description: 'Grocery assistance, reading, and light home organization for seniors.'
    }
  ]);

  // Active Escrow Job State
  const [activeJob, setActiveJob] = useState<ActiveTransaction | null>({
    id: 'tx-8842',
    providerName: 'Sarah Jenkins',
    serviceTitle: 'Bicycle Chain & Brake Repair',
    grossMinutes: 60,
    split: {
      grossMinutes: 60,
      netProviderMinutes: 57.0, // 95%
      mutualAidMinutes: 2.4,   // 4%
      maintainerMinutes: 0.6    // 1%
    },
    status: 'ESCROW_LOCKED',
    verificationPin: '4829',
    createdAt: '10 mins ago'
  });

  // Selected Service for Booking
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Verification PIN Input State
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Double-Blind Review Form State
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  // ==========================================
  // HELPER FUNCTIONS (MODULE LOGIC)
  // ==========================================
  
  // Calculate Feature 5 Fractional Reserve
  const computeFeature5 = (grossMins: number): Feature5Split => {
    const netProviderMinutes = Math.floor(grossMins * 0.95);
    const totalReserve = grossMins - netProviderMinutes;
    const mutualAidMinutes = Number((totalReserve * 0.8).toFixed(2));
    const maintainerMinutes = Number((totalReserve * 0.2).toFixed(2));
    return { grossMinutes: grossMins, netProviderMinutes, mutualAidMinutes, maintainerMinutes };
  };

  // Handle Escrow Lock
  const handleLockEscrow = (service: ServiceItem) => {
    if (walletBalance < service.estimatedMinutes) {
      alert("Insufficient Time Coins in wallet balance!");
      return;
    }

    const split = computeFeature5(service.estimatedMinutes);
    const newJob: ActiveTransaction = {
      id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
      providerName: service.providerName,
      serviceTitle: service.title,
      grossMinutes: service.estimatedMinutes,
      split,
      status: 'ESCROW_LOCKED',
      verificationPin: '4829',
      createdAt: 'Just now'
    };

    setWalletBalance(prev => prev - service.estimatedMinutes);
    setActiveJob(newJob);
    setSelectedService(null);
    setActiveTab('escrow');
  };

  // Handle Verification & Payment Release
  const handleVerifyAndRelease = () => {
    if (!activeJob) return;
    if (enteredPin !== activeJob.verificationPin) {
      setPinError(true);
      return;
    }

    setPinError(false);
    setActiveJob(prev => prev ? { ...prev, status: 'VERIFIED_AND_PAID' } : null);
    setTimeout(() => {
      setActiveTab('review');
    }, 1200);
  };

  // Handle Double-Blind Review Submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      if (activeJob) {
        setActiveJob(prev => prev ? { ...prev, status: 'RATED' } : null);
      }
      setActiveTab('dashboard');
      setReviewSubmitted(false);
    }, 1800);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* HEADER / NAVIGATION */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                time2coin
              </h1>
              <span className="text-xs text-cyan-400/90 font-semibold">1 Hour = 1 Hour Universal Time Equity</span>
            </div>
          </div>

          {/* TOP NAVIGATION BUTTONS */}
          <div className="flex items-center gap-2">
            <a 
              href="/" 
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
            >
              App Dashboard
            </a>
            <a 
              href="/admin" 
              className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 rounded-lg text-xs font-semibold transition flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Admin Portal
            </a>
            <a 
              href="/terms" 
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition"
            >
              Terms & Mission
            </a>
            <div className="bg-slate-900 border border-slate-800 rounded-full px-3 py-1 flex items-center gap-1.5 ml-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-bold text-xs text-cyan-300">{walletBalance} Mins</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 pt-6">
        
        {/* HERO & MISSION STATEMENT ("WHY WE ARE DOING THIS") */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-full text-xs font-bold text-cyan-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Blue Ocean Social Enterprise
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Replacing Cash Friction with Universal Time Equity
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              <strong>time2coin</strong> values every human hour equally (1 Hour = 1 Hour). Whether teaching coding, repairing bicycles, aiding seniors, or helping restaurants prepare surplus food, time2coin builds local community resilience without needing cash.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <span className="font-bold text-cyan-400 block mb-1">95% Net Provider Fee</span>
                <span className="text-slate-400">Direct 1-to-1 time exchange with zero cash charges.</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <span className="font-bold text-emerald-400 block mb-1">4% Community Aid</span>
                <span className="text-slate-400">Automated reserve backing vulnerable community members.</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <span className="font-bold text-blue-400 block mb-1">1% Platform Vault</span>
                <span className="text-slate-400">Sustains open-source infrastructure & P2P offline mesh.</span>
              </div>
            </div>
          </div>
        </section>

        {/* TAB NAVIGATION */}
        <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-2xl mb-6 shadow-md">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'catalog' 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Find Services
          </button>

          <button
            onClick={() => setActiveTab('escrow')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 relative ${
              activeTab === 'escrow' 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            Active Escrow
            {activeJob && activeJob.status !== 'RATED' && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute top-2 right-3" />
            )}
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: DASHBOARD VIEW */}
        {/* =================================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* WALLET SUMMARY CARD */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Verified Wallet</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-white">{walletBalance}</span>
                    <span className="text-lg text-cyan-400 font-medium">Time Coins (Mins)</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">1 Time Coin = 1 Minute of Human Labor</p>
                </div>

                <div className="bg-cyan-950/60 border border-cyan-800/50 rounded-2xl p-3 flex items-center gap-3">
                  <Award className="w-8 h-8 text-cyan-400" />
                  <div>
                    <div className="text-xs text-slate-300 font-medium">Trust Score</div>
                    <div className="text-sm font-bold text-cyan-300">4.95 ★ (Top Tier)</div>
                  </div>
                </div>
              </div>

              {/* FEATURE 5 FRACTIONAL RESERVE TRANSPARENCY CARD */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">Feature 5 Split Engine Active</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Every 1-hour exchange routes 95% to the provider, 4% to the Community Mutual Aid Pool, and 1% to platform operations—zero cash friction.
                </p>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                    <span className="block text-xs text-slate-400">Provider</span>
                    <span className="text-sm font-bold text-emerald-400">95%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                    <span className="block text-xs text-slate-400">Mutual Aid</span>
                    <span className="text-sm font-bold text-cyan-400">4%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                    <span className="block text-xs text-slate-400">Reserve</span>
                    <span className="text-sm font-bold text-blue-400">1%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVE JOB BANNER */}
            {activeJob && activeJob.status !== 'RATED' && (
              <div className="bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-800/60 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-600/20 rounded-xl border border-cyan-500/30">
                    <Lock className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">Active Escrow Locked</span>
                    <h4 className="text-sm font-bold text-white">{activeJob.serviceTitle}</h4>
                    <span className="text-xs text-slate-400">With {activeJob.providerName} • {activeJob.grossMinutes} Mins</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('escrow')}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-cyan-600/30"
                >
                  Verify
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* QUICK SERVICE CATALOG PREVIEW */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Featured Community Services</h3>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.slice(0, 2).map((service) => (
                  <div key={service.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-slate-700 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                          {service.category}
                        </span>
                        <h4 className="font-bold text-slate-100 text-sm mt-2">{service.title}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-white">{service.estimatedMinutes}</span>
                        <span className="text-xs text-slate-400 block">Coins</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">{service.description}</p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-300 font-medium">{service.providerName}</span>
                        <span className="text-xs text-amber-400 font-bold">★ {service.providerRating}</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setActiveTab('catalog');
                        }}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-semibold transition"
                      >
                        Book Job
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: SERVICE CATALOG & BOOKING */}
        {/* =================================================================== */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Community Service Catalog</h2>
              <p className="text-xs text-slate-400">100% Equal Time Exchange. 1 Minute = 1 Time Coin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div key={service.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                        {service.category}
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-black text-white">{service.estimatedMinutes}</span>
                        <span className="text-xs text-slate-400 ml-1">Coins</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-100 text-base">{service.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">{service.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-200 font-semibold">{service.providerName}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-amber-400 font-bold">★ {service.providerRating}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-emerald-400 font-medium">{service.providerTrustScore}% Trust Score</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLockEscrow(service)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-cyan-600/20 flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      Lock Escrow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: ACTIVE ESCROW & VERIFICATION PIN */}
        {/* =================================================================== */}
        {activeTab === 'escrow' && activeJob && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Escrow Job Identifier</span>
                  <h2 className="text-xl font-extrabold text-white mt-0.5">{activeJob.serviceTitle}</h2>
                  <p className="text-xs text-slate-400 mt-1">Provider: {activeJob.providerName}</p>
                </div>
                
                <div className="text-right">
                  <span className="text-2xl font-black text-cyan-300">{activeJob.grossMinutes}</span>
                  <span className="text-xs text-slate-400 block">Gross Mins</span>
                </div>
              </div>

              {/* FEATURE 5 BREAKDOWN IN ESCROW */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Provider Net Pay (95%):</span>
                  <span className="font-bold text-emerald-400">{activeJob.split.netProviderMinutes} Mins</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Community Mutual Aid (4%):</span>
                  <span className="font-bold text-cyan-400">{activeJob.split.mutualAidMinutes} Mins</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Platform Reserve (1%):</span>
                  <span className="font-bold text-blue-400">{activeJob.split.maintainerMinutes} Mins</span>
                </div>
              </div>

              {/* PIN VERIFICATION BOX */}
              {activeJob.status === 'ESCROW_LOCKED' && (
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-900/50 rounded-2xl p-6 text-center space-y-4">
                  <QrCode className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
                  <div>
                    <h3 className="font-bold text-white text-base">Service Completed Verification PIN</h3>
                    <p className="text-xs text-slate-400 mt-1">Enter provider's 4-digit PIN to release funds from escrow</p>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredPin}
                      onChange={(e) => setEnteredPin(e.target.value)}
                      placeholder="e.g. 4829"
                      className="w-full text-center text-2xl font-mono tracking-widest bg-slate-900 border border-slate-700 rounded-xl py-3 text-white focus:outline-none focus:border-cyan-500"
                    />
                    {pinError && (
                      <span className="text-xs text-rose-400 font-medium block mt-2 flex items-center justify-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Incorrect PIN. Try '4829'
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleVerifyAndRelease}
                    className="w-full max-w-xs mx-auto py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-600/20"
                  >
                    Confirm & Release Pay
                  </button>
                </div>
              )}

              {activeJob.status === 'VERIFIED_AND_PAID' && (
                <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-6 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-bold text-emerald-300 text-lg">Payment Released Successfully!</h3>
                  <p className="text-xs text-slate-400">95% credited to {activeJob.providerName}, 5% sent to reserves.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: DOUBLE-BLIND REVIEW MODAL */}
        {/* =================================================================== */}
        {activeTab === 'review' && activeJob && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-lg mx-auto">
            <h2 className="text-lg font-bold text-white mb-1">Double-Blind Service Review</h2>
            <p className="text-xs text-slate-400 mb-6">Rate your experience with {activeJob.providerName}. Ratings remain hidden until both parties submit.</p>

            <form onSubmit={handleSubmitReview} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`p-2 rounded-xl border text-sm font-bold transition flex-1 ${
                        reviewRating >= star 
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      ★ {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Positive Badges</label>
                <div className="flex flex-wrap gap-2">
                  {['Punctual', 'Skilled', 'Polite', 'Clean Work', 'Highly Recommended'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                        selectedTags.includes(tag)
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={reviewSubmitted}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
              >
                {reviewSubmitted ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit Rating'
                )}
              </button>
            </form>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-800 pt-8 max-w-4xl mx-auto px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex justify-center gap-6 text-slate-400 font-medium">
          <a href="/" className="hover:text-cyan-400 transition">App Home</a>
          <a href="/admin" className="hover:text-cyan-400 transition">Super Admin Vault</a>
          <a href="/terms" className="hover:text-cyan-400 transition">Legal & Privacy</a>
        </div>
        <p>time2coin Social Enterprise • 1 Hour = 1 Hour Universal Time Equity Platform</p>
      </footer>
    </div>
  );
}

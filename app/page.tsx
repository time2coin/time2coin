'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, ShieldCheck, HeartHandshake, Award, QrCode, Star, Lock, 
  CheckCircle2, AlertCircle, Sparkles, ArrowRight, User, Check, 
  RefreshCw, Sliders, ChevronRight, Utensils, Wifi, Building2, 
  SlidersHorizontal, Download, FileText, Users, HelpCircle, LogIn, LogOut, 
  MessageSquare, Quote, Globe, Plus, Store, LayoutDashboard, Send, TrendingUp,
  Calculator, ArrowUpRight, Heart, Zap, Leaf, Shield, ChevronDown
} from 'lucide-react';

type TransactionStatus = 'REQUESTED' | 'HOLDING_LOCKED' | 'SERVICE_DELIVERED' | 'VERIFIED_AND_PAID' | 'RATED';

interface ServiceItem {
  id: string;
  providerName: string;
  providerRating: number;
  providerTrustScore: number;
  title: string;
  category: 'Mechanical' | 'Caregiving' | 'Tutoring' | 'Gardening' | 'Food Rescue';
  estimatedMinutes: number;
  description: string;
  isMerchantSurplus?: boolean;
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

export default function Time2CoinMainApp() {
  const [walletBalance, setWalletBalance] = useState<number>(120);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'holding' | 'food' | 'post'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [partnerMenuOpen, setPartnerMenuOpen] = useState<boolean>(false);

  // Interactive Time Calculator State
  const [calcHours, setCalcHours] = useState<number>(2);

  // Service Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<'Mechanical' | 'Caregiving' | 'Tutoring' | 'Gardening' | 'Food Rescue'>('Mechanical');
  const [postMinutes, setPostMinutes] = useState('60');
  const [postDescription, setPostDescription] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

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
    setActiveTab('dashboard');
  };

  const [services, setServices] = useState<ServiceItem[]>([
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
      category: 'Gardening',
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
    },
    {
      id: 'srv-4',
      providerName: 'Green Garden Bistro (Merchant)',
      providerRating: 4.9,
      providerTrustScore: 99,
      title: '2x Gourmet Organic Surplus Lunch Boxes',
      category: 'Food Rescue',
      estimatedMinutes: 45,
      description: 'Fresh chef-prepared artisan lunch meals prepared from daily surplus ingredients.',
      isMerchantSurplus: true
    }
  ]);

  const [activeJob, setActiveJob] = useState<ActiveTransaction | null>({
    id: 'tx-8842',
    providerName: 'Sarah Jenkins',
    serviceTitle: 'Bicycle Chain & Brake Repair',
    grossMinutes: 60,
    split: {
      grossMinutes: 60,
      netProviderMinutes: 57.0,
      mutualAidMinutes: 2.4,
      maintainerMinutes: 0.6
    },
    status: 'HOLDING_LOCKED',
    verificationPin: '4829',
    createdAt: '10 mins ago'
  });

  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'Local Bike Mechanic & Member',
      quote: 'I fixed three bicycle chains in my neighborhood and earned 180 Time Minutes. I redeemed those credits for gourmet surplus meals from Green Garden Bistro without spending cash.',
      rating: 5,
      badge: 'Verified Member'
    },
    {
      name: 'Dr. Aris Thorne',
      role: 'Community Caregiver',
      quote: 'The 4-digit verification PIN system makes every exchange transparent and reliable. I provided elder care for 2 hours and released funds instantly upon service completion.',
      rating: 5,
      badge: 'Trusted Caregiver'
    },
    {
      name: 'Elena Rostova',
      role: 'Organic Gardening Helper',
      quote: '1 hour of my gardening help equals 1 hour of guitar lessons for my son. Equal time value gives everyone dignity regardless of conventional wage gaps.',
      rating: 5,
      badge: 'Top Member'
    }
  ];

  const liveActivityFeed = [
    { user: 'Sarah J.', action: 'completed Bicycle Brake Repair for', value: '60 Time Minutes', time: '2 mins ago' },
    { user: 'Green Garden Bistro', action: 'rescued 4 Surplus Meals for', value: '180 Time Minutes', time: '8 mins ago' },
    { user: 'David C.', action: 'earned 90 Time Minutes in Gardening for', value: 'Elder Care Pass', time: '14 mins ago' }
  ];

  const computeFeature5 = (grossMins: number): Feature5Split => {
    const netProviderMinutes = Math.floor(grossMins * 0.95);
    const totalReserve = grossMins - netProviderMinutes;
    const mutualAidMinutes = Number((totalReserve * 0.8).toFixed(2));
    const maintainerMinutes = Number((totalReserve * 0.2).toFixed(2));
    return { grossMinutes: grossMins, netProviderMinutes, mutualAidMinutes, maintainerMinutes };
  };

  const handleLockHolding = (service: ServiceItem) => {
    if (!currentUser) {
      window.location.href = '/auth';
      return;
    }
    if (walletBalance < service.estimatedMinutes) {
      alert("Insufficient Time Minutes in wallet balance!");
      return;
    }

    const split = computeFeature5(service.estimatedMinutes);
    const newJob: ActiveTransaction = {
      id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
      providerName: service.providerName,
      serviceTitle: service.title,
      grossMinutes: service.estimatedMinutes,
      split,
      status: 'HOLDING_LOCKED',
      verificationPin: '4829',
      createdAt: 'Just now'
    };

    setWalletBalance(prev => prev - service.estimatedMinutes);
    setActiveJob(newJob);
    setActiveTab('holding');
  };

  const handleVerifyAndRelease = () => {
    if (!activeJob) return;
    if (enteredPin !== activeJob.verificationPin) {
      setPinError(true);
      return;
    }

    setPinError(false);
    setActiveJob(prev => prev ? { ...prev, status: 'VERIFIED_AND_PAID' } : null);
    setTimeout(() => {
      setActiveTab('dashboard');
    }, 1200);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      window.location.href = '/auth';
      return;
    }

    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      providerName: currentUser.name || 'Community Member',
      providerRating: 5.0,
      providerTrustScore: 100,
      title: postTitle,
      category: postCategory,
      estimatedMinutes: Number(postMinutes) || 60,
      description: postDescription
    };

    setServices(prev => [newSrv, ...prev]);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setPostTitle('');
      setPostDescription('');
      setActiveTab('dashboard');
    }, 1500);
  };

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 lg:pb-12 overflow-x-hidden w-full">
      {/* TOP NAVIGATION HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur sticky top-0 z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 w-full">
          {/* LOGO & BRANDING */}
          <a href="/" className="flex items-center gap-3 min-w-0 group">
            <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl group-hover:border-cyan-500/50 transition">
              <img 
                src="/Designer.png" 
                alt="time2coin - Universal Time Equity Platform Logo" 
                className="w-8 h-8 object-contain rounded-lg"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent block truncate">
                time2coin
              </span>
              <span className="text-[10px] sm:text-xs text-cyan-400/90 font-semibold hidden sm:inline-block">1 Hour = 1 Hour Universal Time Equity</span>
            </div>
          </a>

          {/* DESKTOP TOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a href="/" className="px-3 py-1.5 text-cyan-300 font-semibold text-xs bg-cyan-950/80 border border-cyan-800/80 rounded-lg">
              Home
            </a>
            {!currentUser && (
              <>
                <a href="#how-it-works" className="px-3 py-1.5 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition">
                  How It Works
                </a>
                <a href="#calculator" className="px-3 py-1.5 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition">
                  Calculator
                </a>
              </>
            )}
            <a href="#directory" className="px-3 py-1.5 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition">
              Services & Food
            </a>

            {/* PARTNERS DROPDOWN MENU WITH ALL 3 PORTALS */}
<div className="relative">
  <button 
    onClick={() => setPartnerMenuOpen(!partnerMenuOpen)}
    className="px-3 py-1.5 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1 bg-slate-900 border border-slate-800"
  >
    For Partners <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
  </button>

  {partnerMenuOpen && (
    <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
      <a href="/merchant" className="flex items-center gap-2 px-3 py-2 text-xs text-amber-300 hover:bg-slate-800 rounded-xl transition font-medium">
        <Utensils className="w-3.5 h-3.5 text-amber-400" /> Merchant Food Portal
      </a>
      <a href="/corporate" className="flex items-center gap-2 px-3 py-2 text-xs text-blue-300 hover:bg-slate-800 rounded-xl transition font-medium">
        <Building2 className="w-3.5 h-3.5 text-blue-400" /> Corporate CSR Portal
      </a>
      <a href="/donors" className="flex items-center gap-2 px-3 py-2 text-xs text-rose-300 hover:bg-slate-800 rounded-xl transition font-medium">
        <Heart className="w-3.5 h-3.5 text-rose-400" /> Private Donors Portal
      </a>
    </div>
  )}
</div>

            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl ml-2">
                <div className="text-right">
                  <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                  <span className="text-[10px] text-cyan-400 block">{currentUser.role}</span>
                </div>
                <button onClick={handleLogout} title="Logout" className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition ml-1">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <a href="/auth" className="ml-2 px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-cyan-600/20">
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </a>
            )}

            {currentUser && (
              <div className="bg-slate-900 border border-slate-800 rounded-full px-3 py-1 flex items-center gap-1.5 ml-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-bold text-xs text-cyan-300">{walletBalance} Mins</span>
              </div>
            )}
          </div>

          {/* MOBILE HEADER UTILITIES */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser && (
              <div className="bg-cyan-950/80 border border-cyan-800/80 rounded-full px-2.5 py-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-extrabold text-xs text-cyan-300">{walletBalance}m</span>
              </div>
            )}

            {currentUser ? (
              <button onClick={handleLogout} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <a href="/auth" className="px-3 py-1.5 bg-cyan-600 text-white rounded-xl text-xs font-bold transition">
                Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 1. PUBLIC VISITOR MARKETING FUNNEL (SHOWN ONLY WHEN LOGGED OUT) */}
      {!currentUser && (
        <>
          {/* HERO BANNER */}
          <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border-b border-slate-800 py-12 sm:py-16 px-4 shadow-2xl relative overflow-hidden w-full">
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-800/60 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-300 mx-auto shadow-lg">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> Universal Time Bank & Food Rescue Network
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
                Trade Skills & Rescue Surplus Food with <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">Zero Cash</span>
              </h1>
              
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                1 Hour of your skill equals 1 Hour of someone else's help. Fix a bike, teach a language, or assist seniors—and redeem your earned Time Minutes for neighboring services or fresh restaurant surplus meals.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a href="/auth" className="px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition shadow-xl shadow-cyan-600/25 flex items-center gap-2">
                  Join Community - 100% Free <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#directory" className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs sm:text-sm rounded-2xl transition">
                  Browse Skills & Food Offers
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs pt-8 max-w-3xl mx-auto">
                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
                  <span className="font-bold text-emerald-400 block text-sm">95% Direct Provider Credit</span>
                  <span className="text-slate-400 text-[11px]">Zero Cash Transaction Fees</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
                  <span className="font-bold text-cyan-400 block text-sm">4% Mutual Aid Protection</span>
                  <span className="text-slate-400 text-[11px]">Supports Vulnerable Neighbors</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
                  <span className="font-bold text-blue-400 block text-sm">1% Platform Maintenance</span>
                  <span className="text-slate-400 text-[11px]">Sustains Open-Source Code</span>
                </div>
              </div>
            </div>
          </section>

          {/* LIVE IMPACT METRICS BAR */}
          <section className="bg-slate-950 border-b border-slate-800 py-6 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400">250+</div>
                <div className="text-xs text-slate-400 font-medium">Active Skill Offers</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">1,420+</div>
                <div className="text-xs text-slate-400 font-medium">Hours Traded</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">850+</div>
                <div className="text-xs text-slate-400 font-medium">Surplus Meals Rescued</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">4.98 ★</div>
                <div className="text-xs text-slate-400 font-medium">Community Trust Rating</div>
              </div>
            </div>
          </section>

          {/* HUMAN STORY BANNER (EARLY PROOF) */}
          <section className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 py-4 px-4">
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center text-xs text-slate-300">
              <Quote className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:inline" />
              <span>
                <strong className="text-white">Marcus V.</strong> fixed 3 bicycle chains in his neighborhood and redeemed his earned Time Minutes for gourmet surplus meals from Green Garden Bistro—without cash.
              </span>
            </div>
          </section>
        </>
      )}

      {/* BODY CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 pt-8 space-y-12 w-full">

        {/* 2. LOGGED-IN MEMBER DASHBOARD (SHOWN ONLY WHEN LOGGED IN) */}
        {currentUser && (
          <div className="space-y-6 w-full">
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Welcome Back, {currentUser.name}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">{walletBalance}</span>
                    <span className="text-base sm:text-lg text-cyan-400 font-medium">Time Minutes</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Earned via P2P labor • Redeemable anywhere for skills or surplus food</p>
                </div>

                <div className="bg-cyan-950/60 border border-cyan-800/50 rounded-2xl p-3 flex items-center gap-3 shrink-0">
                  <Award className="w-7 h-7 text-cyan-400" />
                  <div>
                    <div className="text-xs text-slate-300 font-medium">Trust Score</div>
                    <div className="text-xs sm:text-sm font-bold text-cyan-300">4.95 ★ (Top Tier)</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">Automated 95/4/1 Reserve Protection Active</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your exchanges automatically contribute 4% to the local community mutual aid reserve pool and 1% to open-source platform maintainers.
                </p>
              </div>
            </div>

            {/* ACTIVE HOLDING JOB BANNER */}
            {activeJob && activeJob.status !== 'RATED' && (
              <div className="bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-600/20 rounded-xl border border-cyan-500/30 shrink-0">
                    <Shield className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-wide">Active Job in Holding</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white">{activeJob.serviceTitle}</h3>
                    <span className="text-xs text-slate-400">With {activeJob.providerName} • {activeJob.grossMinutes} Mins Held</span>
                  </div>
                </div>

                <button onClick={() => setActiveTab('holding')} className="w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg">
                  Verify PIN <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* "HOW IT WORKS" 3-STEP EXPLANATION (SHOWN FOR PUBLIC VISITORS) */}
        {!currentUser && (
          <section id="how-it-works" className="space-y-6 scroll-mt-24">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Simple & Fair Economy</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">How time2coin Works in 3 Steps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-3 relative hover:border-cyan-800/60 transition">
                <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center font-black text-cyan-400 text-lg">
                  1
                </div>
                <h3 className="font-bold text-white text-base">Offer a Skill → Earn Minutes</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fix a bicycle, teach guitar, garden, or care for elderly neighbors. 1 hour of labor earns 60 Time Minutes.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-3 relative hover:border-emerald-800/60 transition">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center font-black text-emerald-400 text-lg">
                  2
                </div>
                <h3 className="font-bold text-white text-base">Safe Holding with PIN</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Credits remain safely held during job execution. Release funds directly to your provider using a simple 4-digit verification PIN.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-3 relative hover:border-amber-800/60 transition">
                <div className="w-10 h-10 rounded-2xl bg-amber-950 border border-amber-800 flex items-center justify-center font-black text-amber-400 text-lg">
                  3
                </div>
                <h3 className="font-bold text-white text-base">Redeem Skills or Food</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Spend your earned Time Minutes on neighboring skills or claim fresh, chef-prepared surplus meals from local restaurant partners without cash.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* INTERACTIVE VALUE CALCULATOR (SHOWN FOR PUBLIC VISITORS) */}
        {!currentUser && (
          <section id="calculator" className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 scroll-mt-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-cyan-400" /> Interactive Value Calculator
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  See What 1–3 Hours of Your Time Can Unlock
                </h2>
                <p className="text-xs text-slate-300 mt-1">Adjust the slider to see how your skill contribution translates into community value.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl shrink-0">
                <span className="text-xs text-slate-400 block">Your Skill Time</span>
                <span className="text-xl font-black text-cyan-300">{calcHours} Hours ({calcHours * 60} Mins)</span>
              </div>
            </div>

            <div className="space-y-2">
              <input 
                type="range" 
                min={1} 
                max={5} 
                step={1} 
                value={calcHours} 
                onChange={(e) => setCalcHours(Number(e.target.value))} 
                className="w-full accent-cyan-500 cursor-pointer h-3"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 Hour</span>
                <span>2 Hours</span>
                <span>3 Hours</span>
                <span>4 Hours</span>
                <span>5 Hours</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Provider Pay (95%)</span>
                <div className="text-2xl font-black text-white">{Math.floor(calcHours * 60 * 0.95)} Mins</div>
                <p className="text-[11px] text-slate-400">Direct credit earned in your personal Time Wallet.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Surplus Meals Redeemable</span>
                <div className="text-2xl font-black text-white">{Math.floor((calcHours * 60 * 0.95) / 45)} Gourmet Meals</div>
                <p className="text-[11px] text-slate-400">Chef-prepared surplus meals from local restaurants.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">Mutual Aid Reserve (4%)</span>
                <div className="text-2xl font-black text-white">{(calcHours * 60 * 0.04).toFixed(1)} Mins</div>
                <p className="text-[11px] text-slate-400">Automated contribution to local vulnerable care pool.</p>
              </div>
            </div>
          </section>
        )}

        {/* PUBLIC & MEMBER LIVE MARKETPLACE (SKILLS + FOOD LISTINGS) */}
        <section id="directory" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Live Marketplace</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">Explore Available Skills & Merchant Food Offers</h2>
              <p className="text-xs text-slate-400 mt-1">Click on any offer below to redeem or book instantly.</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['All', 'Mechanical', 'Caregiving', 'Gardening', 'Food Rescue'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)} 
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    selectedCategory === cat 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' 
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className={`border rounded-2xl p-5 space-y-4 transition flex flex-col justify-between w-full shadow-lg ${
                  service.isMerchantSurplus 
                    ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/30 border-amber-800/60 hover:border-amber-500' 
                    : 'bg-slate-950 border-slate-800 hover:border-cyan-500/60'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      service.isMerchantSurplus
                        ? 'text-amber-300 bg-amber-950 border-amber-800'
                        : 'text-cyan-300 bg-cyan-950 border-cyan-800'
                    }`}>
                      {service.isMerchantSurplus ? 'Merchant Surplus Food' : service.category}
                    </span>
                    <div className="text-right">
                      <span className={`text-lg font-black ${service.isMerchantSurplus ? 'text-amber-300' : 'text-white'}`}>
                        {service.estimatedMinutes}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">Mins</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-base">{service.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{service.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-200 font-semibold">{service.providerName}</div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                      <span className="text-amber-400 font-bold">★ {service.providerRating}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-medium">{service.providerTrustScore}% Trust Score</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleLockHolding(service)} 
                    className={`px-4 py-2 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md ${
                      service.isMerchantSurplus
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white'
                    }`}
                  >
                    {service.isMerchantSurplus ? (
                      <>
                        <Utensils className="w-3.5 h-3.5" /> Redeem Meal
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Book Job
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LOGGED-IN ONLY TAB: POST NEW OFFER FORM */}
        {currentUser && activeTab === 'post' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl max-w-xl mx-auto w-full space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" /> Post a Service or Skill Offer
              </h2>
              <p className="text-xs text-slate-400 mt-1">Share your skills to earn Time Minutes from community neighbors.</p>
            </div>

            {postSuccess && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Service offer published successfully! Redirecting to community directory...</span>
              </div>
            )}

            <form onSubmit={handleCreateOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Guitar Lessons / Plumbing Repair"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Mechanical">Mechanical</option>
                    <option value="Caregiving">Caregiving</option>
                    <option value="Tutoring">Tutoring</option>
                    <option value="Gardening">Gardening</option>
                    <option value="Food Rescue">Food Rescue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time Minutes</label>
                  <input
                    type="number"
                    required
                    value={postMinutes}
                    onChange={(e) => setPostMinutes(e.target.value)}
                    placeholder="60"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  placeholder="Describe what you will provide in detail..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" /> Publish Offer
              </button>
            </form>
          </div>
        )}

        {/* LOGGED-IN ONLY TAB: ACTIVE HOLDING & PIN VERIFICATION */}
        {currentUser && activeTab === 'holding' && activeJob && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6 w-full">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Active Job in Holding</span>
                <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">{activeJob.serviceTitle}</h2>
                <p className="text-xs text-slate-400 mt-1">Provider: {activeJob.providerName}</p>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-cyan-300">{activeJob.grossMinutes}</span>
                <span className="text-xs text-slate-400 block">Gross Mins</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Provider Net Pay (95%):</span>
                <span className="font-bold text-emerald-400">{activeJob.split.netProviderMinutes} Mins</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Community Mutual Aid (4%):</span>
                <span className="font-bold text-cyan-400">{activeJob.split.mutualAidMinutes} Mins</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Platform Vault (1%):</span>
                <span className="font-bold text-blue-400">{activeJob.split.maintainerMinutes} Mins</span>
              </div>
            </div>

            {activeJob.status === 'HOLDING_LOCKED' && (
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-900/50 rounded-2xl p-5 text-center space-y-4">
                <QrCode className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">4-Digit Verification PIN</h3>
                  <p className="text-xs text-slate-400 mt-1">Enter provider's 4-digit PIN to release funds from holding</p>
                </div>

                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    placeholder="e.g. 4829"
                    className="w-full text-center text-2xl font-mono tracking-widest bg-slate-900 border border-slate-700 rounded-xl py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                  {pinError && (
                    <span className="text-xs text-rose-400 font-medium block mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Incorrect PIN. Try '4829'
                    </span>
                  )}
                </div>

                <button onClick={handleVerifyAndRelease} className="w-full max-w-xs mx-auto py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg">
                  Confirm & Release Pay
                </button>
              </div>
            )}

            {activeJob.status === 'VERIFIED_AND_PAID' && (
              <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-emerald-300 text-base sm:text-lg">Payment Released Successfully!</h3>
                <p className="text-xs text-slate-400">95% credited to {activeJob.providerName}, 5% routed to reserves.</p>
              </div>
            )}
          </div>
        )}

        {/* LIVE COMMUNITY ACTIVITY FEED */}
        <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Live Community Activity</h2>
          </div>

          <div className="space-y-3">
            {liveActivityFeed.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-slate-200 truncate">
                    <strong>{item.user}</strong> {item.action} <span className="text-cyan-300 font-bold">{item.value}</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0 ml-2">{item.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* VERIFIED COMMUNITY TESTIMONIALS SECTION */}
        <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Verified Social Proof</span>
              <h2 className="text-lg font-extrabold text-white mt-1 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" /> Member Stories & Testimonials
              </h2>
            </div>
            <span className="text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-3 py-1 rounded-full">
              ★ 4.98 Community Rating
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-cyan-500/40" />
                  <p className="text-xs text-slate-300 leading-relaxed italic">"{t.quote}"</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-xs">{t.name}</h3>
                    <span className="text-[10px] text-slate-400 block">{t.role}</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING CALL-TO-ACTION (SHOWN FOR PUBLIC VISITORS) */}
        {!currentUser && (
          <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <h2 className="text-2xl font-black text-white">Ready to Start Trading Time?</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              100% Free • Zero Cash Required • Earn credits through skills and redeem fresh surplus food.
            </p>
            <div className="pt-2">
              <a
                href="/auth"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-extrabold text-sm rounded-2xl transition shadow-xl"
              >
                Join Community Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>
        )}

      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur border-t border-slate-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-stretch justify-around px-2 pt-1.5 pb-2">
          {/* HOME */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all flex-1 ${
              activeTab === 'dashboard' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className={`w-5 h-5 ${activeTab === 'dashboard' ? 'scale-110 text-cyan-400' : ''} transition-transform`} />
            <span className="text-[10px] tracking-tight">Home</span>
          </button>

          {/* BROWSE SKILLS & FOOD */}
          <a
            href="#directory"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all flex-1 text-slate-400 hover:text-slate-200"
          >
            <SlidersHorizontal className="w-5 h-5 transition-transform" />
            <span className="text-[10px] tracking-tight">Directory</span>
          </a>

          {/* POST OFFER (RAISED CENTER BUTTON) */}
          <button
            onClick={() => {
              if (!currentUser) {
                window.location.href = '/auth';
              } else {
                setActiveTab('post');
              }
            }}
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all flex-1"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center -mt-5 shadow-lg shadow-cyan-500/40 ring-4 ring-slate-950">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 text-slate-400">
              Post
            </span>
          </button>

          {/* FOOD RESCUE QUICK NAV */}
          <a
            href="#directory"
            onClick={() => setSelectedCategory('Food Rescue')}
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all flex-1 text-slate-400 hover:text-amber-400"
          >
            <Utensils className="w-5 h-5 transition-transform" />
            <span className="text-[10px] tracking-tight">Food</span>
          </a>

          {/* CONDITIONAL TAB: HOLDING (LOGGED-IN) vs SIGN IN (LOGGED-OUT) */}
          {currentUser ? (
            <button
              onClick={() => setActiveTab('holding')}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all flex-1 relative ${
                activeTab === 'holding' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className={`w-5 h-5 ${activeTab === 'holding' ? 'scale-110 text-cyan-400' : ''} transition-transform`} />
              <span className="text-[10px] tracking-tight">Holding</span>
              {activeJob && activeJob.status !== 'RATED' && (
                <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>
          ) : (
            <a
              href="/auth"
              className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-cyan-400 transition-all flex-1"
            >
              <LogIn className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">Sign In</span>
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, ShieldCheck, HeartHandshake, Award, QrCode, Star, Lock, 
  CheckCircle2, AlertCircle, Sparkles, ArrowRight, User, Check, 
  RefreshCw, Sliders, ChevronRight, Utensils, Wifi, Building2, 
  SlidersHorizontal, Download, FileText, Users, HelpCircle, LogIn, LogOut, 
  MessageSquare, Quote, Globe, Plus, Store, LayoutDashboard, Send, TrendingUp, Sparkle
} from 'lucide-react';

type TransactionStatus = 'REQUESTED' | 'ESCROW_LOCKED' | 'SERVICE_DELIVERED' | 'VERIFIED_AND_PAID' | 'RATED';

const RATING_STARS = [1, 2, 3, 4, 5] as const;

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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'escrow' | 'food' | 'mesh' | 'review' | 'post'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Dynamic Narrative / Multi-Language dictionary
  const [langDict, setLangDict] = useState<Record<string, { en: string; ms: string }>>({});
  const [currentLang, setCurrentLang] = useState<'en' | 'ms'>('en');

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

    const storedNarratives = localStorage.getItem('time2coin_narratives');
    if (storedNarratives) {
      try {
        setLangDict(JSON.parse(storedNarratives));
      } catch(e) {}
    }

    const savedLang = localStorage.getItem('time2coin_active_lang');
    if (savedLang === 'en' || savedLang === 'ms') {
      setCurrentLang(savedLang);
    }
  }, []);

  // Helper function to resolve dynamic narrative text with fallback
  const t = (key: string, defaultText: string) => {
    if (langDict[key] && langDict[key][currentLang]) {
      return langDict[key][currentLang];
    }
    return defaultText;
  };

  const handleLogout = () => {
    localStorage.removeItem('time2coin_user');
    setCurrentUser(null);
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
    status: 'ESCROW_LOCKED',
    verificationPin: '4829',
    createdAt: '10 mins ago'
  });

  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'Local Bike Mechanic & Member',
      quote: 'I fixed three bicycle chains in my neighborhood and earned 180 Time Coins. I used those coins to get artisan meals for my family from Green Garden Bistro without spending a dime of cash.',
      rating: 5,
      badge: 'Skilled & Punctual'
    },
    {
      name: 'Dr. Aris Thorne',
      role: 'Community Caregiver',
      quote: 'The 4-digit escrow PIN system makes every transaction feel completely safe. I provided elder companion care for 2 hours and released funds instantly upon service completion.',
      rating: 5,
      badge: 'Trusted Provider'
    },
    {
      name: 'Elena Rostova',
      role: 'Organic Gardening Helper',
      quote: 'Equal time value gives everyone dignity. Whether it is tutoring or gardening, 1 hour equals 1 hour. It has transformed our local neighbor connections!',
      rating: 5,
      badge: 'Top Community Member'
    }
  ];

  const liveActivityFeed = [
    { user: 'Sarah J.', action: 'completed Bicycle Brake Repair for', value: '60 Time Coins', time: '2 mins ago' },
    { user: 'Green Garden Bistro', action: 'rescued 4 Surplus Meals for', value: '180 Time Coins', time: '8 mins ago' },
    { user: 'David C.', action: 'earned 90 Time Coins in Gardening for', value: 'Elder Care Pass', time: '14 mins ago' }
  ];

  const computeFeature5 = (grossMins: number): Feature5Split => {
    const netProviderMinutes = Math.floor(grossMins * 0.95);
    const totalReserve = grossMins - netProviderMinutes;
    const mutualAidMinutes = Number((totalReserve * 0.8).toFixed(2));
    const maintainerMinutes = Number((totalReserve * 0.2).toFixed(2));
    return { grossMinutes: grossMins, netProviderMinutes, mutualAidMinutes, maintainerMinutes };
  };

  const handleLockEscrow = (service: ServiceItem) => {
    if (!currentUser) {
      alert("Please Sign In first to lock escrow for community services.");
      window.location.href = '/auth';
      return;
    }
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
    setActiveTab('escrow');
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
      setActiveTab('review');
    }, 1200);
  };

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

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please Sign In first to post a service offer.");
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
      setActiveTab('services');
    }, 1500);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 lg:pb-12 overflow-x-hidden w-full">
      {/* TOP NAVIGATION HEADER WITH OFFICIAL DESIGNER LOGO */}
      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur sticky top-0 z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 w-full">
          {/* LOGO & BRANDING */}
          <a href="/" className="flex items-center gap-3 min-w-0 group">
            <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl group-hover:border-cyan-500/50 transition">
              <img 
                src="/Designer.png" 
                alt="time2coin Logo" 
                className="w-8 h-8 object-contain rounded-lg"
                onError={(e) => {
                  // Fallback icon if image path is loading
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent truncate">
                time2coin
              </h1>
              <span className="text-[10px] sm:text-xs text-cyan-400/90 font-semibold hidden sm:inline-block">1 Hour = 1 Hour Universal Time Equity</span>
            </div>
          </a>

          {/* DESKTOP TOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'dashboard' ? 'bg-cyan-950 border border-cyan-800 text-cyan-300' : 'text-slate-300 hover:bg-slate-900'}`}>
              {t('menu.home', 'Home')}
            </button>
            <a href="#how-it-works" className="px-3 py-1.5 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition">
              How It Works
            </a>
            <button onClick={() => setActiveTab('services')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'services' ? 'bg-cyan-950 border border-cyan-800 text-cyan-300' : 'text-slate-300 hover:bg-slate-900'}`}>
              Browse
            </button>
            <a href="#categories" className="px-3 py-1.5 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition">
              Categories
            </a>
            <a href="/merchant" className="px-3 py-1.5 text-slate-300 hover:text-amber-400 rounded-lg text-xs font-semibold transition flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-amber-400" /> {t('menu.merchant', 'Food Rescue')}
            </a>
            <a href="/corporate" className="px-3 py-1.5 text-slate-300 hover:text-blue-400 rounded-lg text-xs font-semibold transition flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-blue-400" /> {t('menu.corporate', 'Corporate')}
            </a>

            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl ml-2">
                <div className="text-right">
                  <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                  <span className="text-[10px] text-cyan-400 block">{currentUser.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <a 
                href="/auth" 
                className="ml-2 px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
              >
                <LogIn className="w-3.5 h-3.5" /> {t('menu.signin', 'Sign In')}
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
            <div className="bg-cyan-950/80 border border-cyan-800/80 rounded-full px-2.5 py-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-extrabold text-xs text-cyan-300">{walletBalance}m</span>
            </div>

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <a 
                href="/auth" 
                className="px-3 py-1.5 bg-cyan-600 text-white rounded-xl text-xs font-bold transition"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      {/* BODY CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col lg:flex-row gap-6 w-full">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-64 bg-slate-950 border border-slate-800 rounded-3xl p-4 h-fit sticky top-20 space-y-2 shadow-xl shrink-0">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Navigation Hub</div>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
            <Clock className="w-4 h-4" /> Member Dashboard
          </button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'services' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
            <SlidersHorizontal className="w-4 h-4" /> Service Directory
          </button>
          <button onClick={() => setActiveTab('post')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'post' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
            <Plus className="w-4 h-4 text-cyan-400" /> Post New Offer
          </button>
          <button onClick={() => setActiveTab('escrow')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'escrow' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4" /> Active Escrow
            </div>
            {activeJob && activeJob.status !== 'RATED' && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
          </button>
          <button onClick={() => setActiveTab('food')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'food' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
            <Utensils className="w-4 h-4 text-amber-400" /> Food Rescue Filter
          </button>
          <button onClick={() => setActiveTab('mesh')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === 'mesh' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
            <Wifi className="w-4 h-4 text-emerald-400" /> Offline BLE Mesh Queue
          </button>

          <hr className="border-slate-800 my-3" />

          <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">Specialized Portals</div>
          <a href="/merchant" className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-amber-300 transition">
            <Utensils className="w-4 h-4" /> Restaurant Merchant Portal
          </a>
          <a href="/corporate" className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-blue-300 transition">
            <Building2 className="w-4 h-4" /> Corporate CSR Portal
          </a>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 space-y-10 min-w-0 w-full">
          {/* HERO BANNER & CONVERSION CALLOUT */}
          <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden w-full space-y-6">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-full text-xs font-bold text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Blue Ocean Social Enterprise
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {t('hero.title', 'Replacing Cash Friction with Universal Time Equity')}
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                {t('hero.subtitle', 'time2coin values every human hour equally (1 Hour = 1 Hour). Earn time credits through bicycle repair, elder care, or skill sharing—and spend those same coins on local restaurant surplus food or mutual aid care without cash.')}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a 
                  href="/auth" 
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition shadow-xl shadow-cyan-600/25 flex items-center gap-2"
                >
                  Join the Community <ArrowRight className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => setActiveTab('services')}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs sm:text-sm rounded-2xl transition"
                >
                  Browse Live Services
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs pt-4 border-t border-slate-800/80">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
                <span className="font-bold text-emerald-400 block text-sm">{t('badge.providerPay', '95% Provider Pay')}</span>
                <span className="text-slate-400 text-[11px]">Zero Cash Transaction Fees</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
                <span className="font-bold text-cyan-400 block text-sm">{t('badge.mutualAid', '4% Mutual Aid')}</span>
                <span className="text-slate-400 text-[11px]">Community Safety Net</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
                <span className="font-bold text-blue-400 block text-sm">{t('badge.platformVault', '1% Platform Vault')}</span>
                <span className="text-slate-400 text-[11px]">Sustains Open-Source Code</span>
              </div>
            </div>
          </section>

          {/* LIVE IMPACT STATISTICS BAR */}
          <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
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

          {/* "HOW IT WORKS" 3-STEP EXPLANATION BOXES */}
          <section id="how-it-works" className="space-y-4 scroll-mt-24">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Simple & Fair Economy</span>
              <h3 className="text-xl font-extrabold text-white">How time2coin Works</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center font-black text-cyan-400 text-lg">
                  1
                </div>
                <h4 className="font-bold text-white text-base">Offer Your Skills</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fix a bicycle, teach guitar, or help an elder with grocery shopping. Every 1 hour you work earns you 60 Time Coins.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center font-black text-emerald-400 text-lg">
                  2
                </div>
                <h4 className="font-bold text-white text-base">Locked Escrow & 4-Digit PIN</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Time coins remain locked in escrow until service delivery. Release payment safely using a 4-digit verification PIN.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-amber-950 border border-amber-800 flex items-center justify-center font-black text-amber-400 text-lg">
                  3
                </div>
                <h4 className="font-bold text-white text-base">Redeem Anywhere</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Spend your earned Time Coins on neighboring skills or redeem fresh surplus meals from local restaurant partners without cash.
                </p>
              </div>
            </div>
          </section>

          {/* BROWSE BY CATEGORY SECTION */}
          <section id="categories" className="space-y-4 scroll-mt-24">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Explore Marketplace</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">Browse by Category</h3>
              </div>
              <button onClick={() => setActiveTab('services')} className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { name: 'Mechanical', color: 'border-cyan-800 text-cyan-300 bg-cyan-950/50' },
                { name: 'Caregiving', color: 'border-blue-800 text-blue-300 bg-blue-950/50' },
                { name: 'Tutoring', color: 'border-purple-800 text-purple-300 bg-purple-950/50' },
                { name: 'Gardening', color: 'border-emerald-800 text-emerald-300 bg-emerald-950/50' },
                { name: 'Food Rescue', color: 'border-amber-800 text-amber-300 bg-amber-950/50' }
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setActiveTab('services');
                  }}
                  className={`p-4 border rounded-2xl font-bold text-xs text-center transition hover:scale-105 ${cat.color}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </section>

          {/* MID-PAGE CONVERSION BANNER (1st Join Reminder) */}
          <section className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-800/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">No Cash Required</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">Ready to exchange skills with neighbors?</h3>
              <p className="text-xs text-slate-300">Join over 1,000+ local members trading labor and food credits today.</p>
            </div>
            <a
              href="/auth"
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition shadow-xl shrink-0"
            >
              Create Free Account
            </a>
          </section>

          {/* "WHAT'S HAPPENING NOW" LIVE ACTIVITY FEED */}
          <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">What's Happening Now in the Community</h3>
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

          {/* TAB 1 & TAB 2 MAIN DYNAMIC CONTENT */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 w-full">
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      {currentUser ? `Welcome Back, ${currentUser.name}` : 'Verified Time Wallet Preview'}
                    </span>
                    {currentUser ? (
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white">{walletBalance}</span>
                        <span className="text-base sm:text-lg text-cyan-400 font-medium">Time Coins (Mins)</span>
                      </div>
                    ) : (
                      <div className="mt-2 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                        <span className="text-xs text-slate-300 block">Sign in to view your live balance and execute P2P time trades.</span>
                        <a href="/auth" className="inline-block mt-2 px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-xs font-bold">Sign In Now</a>
                      </div>
                    )}
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
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">Feature 5 Split Engine Active</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Your transactions automatically contribute 4% to the local community mutual aid reserve pool and 1% to open-source maintainers.
                  </p>
                </div>
              </div>

              {activeJob && activeJob.status !== 'RATED' && (
                <div className="bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-600/20 rounded-xl border border-cyan-500/30 shrink-0">
                      <Lock className="w-5 h-5 text-cyan-400 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-wide">Active Escrow Job Locked</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{activeJob.serviceTitle}</h4>
                      <span className="text-xs text-slate-400">With {activeJob.providerName} • {activeJob.grossMinutes} Mins</span>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('escrow')} className="w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg">
                    Verify PIN <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8 w-full">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-white">Community Service Directory</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Mechanical', 'Caregiving', 'Gardening', 'Food Rescue'].map((cat) => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded-full text-xs font-semibold transition ${selectedCategory === cat ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between w-full">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800/50">
                            {service.category}
                          </span>
                          <div className="text-right">
                            <span className="text-base sm:text-lg font-black text-white">{service.estimatedMinutes}</span>
                            <span className="text-xs text-slate-400 ml-1">Coins</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-100 text-sm sm:text-base">{service.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mt-2">{service.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-200 font-semibold">{service.providerName}</div>
                          <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                            <span className="text-amber-400 font-bold">★ {service.providerRating}</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-emerald-400 font-medium">{service.providerTrustScore}% Trust Score</span>
                          </div>
                        </div>

                        <button onClick={() => handleLockEscrow(service)} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs rounded-xl transition flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> Book Job
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MERCHANT SURPLUS & FOOD RESCUE SHOWCASE */}
          <section id="food" className="bg-slate-950 border border-amber-800/50 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Utensils className="w-7 h-7 text-amber-400 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-white">Merchant Surplus Food Rescue</h3>
                  <p className="text-xs text-slate-300">Spend Time Coins earned anywhere in the community on fresh surplus meals from local restaurants.</p>
                </div>
              </div>
              <a href="/merchant" className="text-xs font-bold text-amber-400 hover:text-amber-300 hidden sm:block">
                Merchant Portal →
              </a>
            </div>

            {services.filter(s => s.isMerchantSurplus).map((service) => (
              <div key={service.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800/50">
                      Merchant Surplus
                    </span>
                    <h4 className="font-bold text-white text-sm sm:text-base mt-2">{service.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black text-amber-300">{service.estimatedMinutes}</span>
                    <span className="text-xs text-slate-400 block">Time Coins</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-semibold">{service.providerName}</span>
                  <button onClick={() => handleLockEscrow(service)} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs rounded-xl transition shadow-lg">
                    Redeem Surplus Meal
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* VERIFIED COMMUNITY TESTIMONIALS SECTION */}
          <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Verified Social Proof</span>
                <h3 className="text-lg font-extrabold text-white mt-1 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" /> Member Stories & Testimonials
                </h3>
              </div>
              <span className="text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-3 py-1 rounded-full">
                ★ 4.98 Community Trust Avg
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
                      <h4 className="font-bold text-white text-xs">{t.name}</h4>
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

          {/* TAB 3: POST NEW OFFER */}
          {activeTab === 'post' && (
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl max-w-xl mx-auto w-full space-y-5">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-cyan-400" /> Post a Service or Skill Offer
                </h2>
                <p className="text-xs text-slate-400 mt-1">Share your skills to earn Time Coins from community neighbors.</p>
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Time Coins (Minutes)</label>
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

          {/* OTHER TABS (ESCROW, BLE MESH, REVIEWS) */}
          {activeTab === 'escrow' && activeJob && (
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6 w-full">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Active Escrow Job</span>
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

              {activeJob.status === 'ESCROW_LOCKED' && (
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-900/50 rounded-2xl p-5 text-center space-y-4">
                  <QrCode className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">4-Digit Verification PIN</h3>
                    <p className="text-xs text-slate-400 mt-1">Enter provider's 4-digit PIN to release funds from escrow</p>
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

          {activeTab === 'mesh' && (
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 w-full">
              <div className="flex items-center gap-3">
                <Wifi className="w-7 h-7 text-emerald-400 animate-pulse shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-white">Offline BLE Mesh Sync Engine</h3>
                  <p className="text-xs text-slate-400">Cryptographically signed Ed25519 receipts stored locally when internet is unavailable.</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Pending Offline Receipts:</span>
                  <span className="font-bold text-emerald-400">2 Receipts Ready to Relay</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Local Cryptographic Key:</span>
                  <span className="font-mono text-cyan-300">ed25519:7f8a...99b2</span>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Scan Nearby BLE Peers & Gossip Relay
              </button>
            </div>
          )}

          {activeTab === 'review' && activeJob && (
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl max-w-lg mx-auto w-full">
              <h2 className="text-base sm:text-lg font-bold text-white mb-1">Double-Blind Service Review</h2>
              <p className="text-xs text-slate-400 mb-6">Rate your experience with {activeJob.providerName}. Ratings remain hidden until both parties submit.</p>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {RATING_STARS.map((star) => (
                      <button key={star} type="button" onClick={() => setReviewRating(star)} className={`p-2 rounded-xl border text-xs sm:text-sm font-bold transition flex-1 ${reviewRating >= star ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                        ★ {star}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Positive Badges</label>
                  <div className="flex flex-wrap gap-2">
                    {['Punctual', 'Skilled', 'Polite', 'Clean Work', 'Highly Recommended'].map((tag) => (
                      <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${selectedTags.includes(tag) ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={reviewSubmitted} className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2">
                  {reviewSubmitted ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Submit Rating'}
                </button>
              </form>
            </div>
          )}

          {/* CLOSING CALL-TO-ACTION (2nd Join Reminder) */}
          <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <h3 className="text-2xl font-black text-white">Ready to Start Trading Time?</h3>
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

        </main>
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

          {/* BROWSE */}
          <button
            onClick={() => setActiveTab('services')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all flex-1 ${
              activeTab === 'services' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className={`w-5 h-5 ${activeTab === 'services' ? 'scale-110 text-cyan-400' : ''} transition-transform`} />
            <span className="text-[10px] tracking-tight">Browse</span>
          </button>

          {/* POST OFFER (RAISED CENTER BUTTON) */}
          <button
            onClick={() => setActiveTab('post')}
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all flex-1"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center -mt-5 shadow-lg shadow-cyan-500/40 ring-4 ring-slate-950">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className={`text-[10px] font-bold mt-0.5 ${activeTab === 'post' ? 'text-cyan-400' : 'text-slate-400'}`}>
              Post
            </span>
          </button>

          {/* FOOD RESCUE */}
          <button
            onClick={() => setActiveTab('food')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all flex-1 ${
              activeTab === 'food' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Utensils className={`w-5 h-5 ${activeTab === 'food' ? 'scale-110 text-amber-400' : ''} transition-transform`} />
            <span className="text-[10px] tracking-tight">Food</span>
          </button>

          {/* ESCROW / CORPORATE */}
          <button
            onClick={() => setActiveTab('escrow')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-all flex-1 relative ${
              activeTab === 'escrow' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className={`w-5 h-5 ${activeTab === 'escrow' ? 'scale-110 text-cyan-400' : ''} transition-transform`} />
            <span className="text-[10px] tracking-tight">Escrow</span>
            {activeJob && activeJob.status !== 'RATED' && (
              <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}

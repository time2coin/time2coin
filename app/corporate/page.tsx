'use client';

import React, { useState, useEffect } from 'react';
import { 
  Utensils, Store, ArrowRight, ShieldCheck, CheckCircle2, 
  Sparkles, Leaf, LogIn, Plus, Send, ArrowLeft, LogOut,
  Image as ImageIcon, X, ZoomIn, HeartHandshake, Eye, Clock,
  SlidersHorizontal, Building2, Heart, Shield, Menu
} from 'lucide-react';
import CountrySelector from '@/components/CountrySelector';

interface FoodItem {
  id: string;
  title: string;
  quantity: string;
  timeValue: number; // 0 means FREE
  isFree: boolean;
  pickupWindow: string;
  description: string;
  photos: string[];
  merchantName: string;
  createdAt: string;
}

export default function MerchantPortalPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Post Surplus Food Form State
  const [foodTitle, setFoodTitle] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('5');
  const [timeValue, setTimeValue] = useState('45');
  const [isFree, setIsFree] = useState(false);
  const [pickupWindow, setPickupWindow] = useState('5:00 PM - 7:00 PM');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [postSuccess, setPostSuccess] = useState(false);

  // Lightbox Modal State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sampleFoodPhotos = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80'
  ];

  const [publishedOffers, setPublishedOffers] = useState<FoodItem[]>([
    {
      id: 'm-1',
      title: 'Artisan Sourdough & Fresh Pastry Box',
      quantity: '4 Boxes',
      timeValue: 0,
      isFree: true,
      pickupWindow: '6:00 PM - 7:30 PM',
      description: 'Daily fresh-baked sourdough loaves and croissants. Offered completely free to support community food security.',
      photos: [
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80'
      ],
      merchantName: 'Green Garden Bakery',
      createdAt: '15 mins ago'
    },
    {
      id: 'm-2',
      title: 'Gourmet Organic Bento Lunch Boxes',
      quantity: '3 Boxes',
      timeValue: 45,
      isFree: false,
      pickupWindow: '5:00 PM - 6:30 PM',
      description: 'Balanced organic chef-prepared meals with brown rice, roasted vegetables, and grilled protein.',
      photos: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80'
      ],
      merchantName: 'Green Garden Bistro',
      createdAt: '1 hour ago'
    }
  ]);

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

  const handleAddSamplePhoto = (url: string) => {
    if (photos.length >= 3) {
      alert('Maximum 3 photos allowed per food offer.');
      return;
    }
    if (!photos.includes(url)) {
      setPhotos([...photos, url]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handlePostFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      window.location.href = '/auth';
      return;
    }

    const newItem: FoodItem = {
      id: `m-${Date.now()}`,
      title: foodTitle,
      quantity: foodQuantity,
      timeValue: isFree ? 0 : Number(timeValue) || 0,
      isFree,
      pickupWindow,
      description,
      photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'],
      merchantName: currentUser.name || 'Verified Merchant',
      createdAt: 'Just now'
    };

    setPublishedOffers([newItem, ...publishedOffers]);
    setPostSuccess(true);
    
    setTimeout(() => {
      setPostSuccess(false);
      setFoodTitle('');
      setDescription('');
      setPhotos([]);
      setIsFree(false);
      setTimeValue('45');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 lg:pb-16 overflow-x-hidden w-full">
      {/* HEADER WITH SLEEK RESPONSIVE BACK BUTTON */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40 px-3 sm:px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a 
              href="/" 
              className="p-2 sm:px-3 sm:py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm"
              title="Back to Home"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Back to Home</span>
            </a>

            <a href="/" className="flex items-center gap-2 min-w-0 truncate">
              <div className="p-1 bg-amber-500/20 border border-amber-500/40 rounded-xl shrink-0">
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <span className="font-bold text-sm sm:text-lg text-white truncate">time2coin <span className="text-amber-400 text-xs font-normal hidden md:inline">| Merchant Food Portal</span></span>
            </a>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <CountrySelector userJurisdictionId={currentUser?.jurisdiction_id} />

            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl shrink-0">
                <span className="text-[10px] sm:text-xs font-bold text-amber-300 truncate max-w-[100px] sm:max-w-none">{currentUser.name}</span>
                <button onClick={handleLogout} title="Sign Out" className="p-1 text-slate-400 hover:text-rose-400">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <a href="/auth" className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center gap-1 shrink-0 shadow-md">
                <LogIn className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Register / </span>Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-800/60 px-4 py-1 rounded-full text-xs font-bold text-amber-300">
            <Store className="w-4 h-4 text-amber-400" /> Zero Food Waste • Free Community Give Options
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Turn Surplus Food into <span className="text-amber-400">Community Goodwill</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Targeted for local restaurants, cafes, bakeries, and grocery stores. Post food with up to 3 showcase photos, list for Time Minutes or offer 100% Free to support neighborhood families.
          </p>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
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
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Option for 100% FREE Give</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose to offer surplus bakery items or daily specials completely free to vulnerable local seniors and neighbors.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Showcase Up to 3 Photos</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Attach high-resolution photos of your food. Neighbors can tap thumbnails to enlarge and inspect fresh dishes.
            </p>
          </div>
        </div>

        {/* POSTING FORM */}
        <div className="bg-slate-900 border border-amber-800/40 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
          {currentUser ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" /> Post Food Product Listing
                </h2>
                <span className="text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-0.5 rounded-full">
                  Verified Merchant
                </span>
              </div>

              {postSuccess && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-2xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Surplus meal listing published live with high-res photos!</span>
                </div>
              )}

              <form onSubmit={handlePostFood} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Meal / Food Item Title</label>
                  <input 
                    type="text" 
                    required 
                    value={foodTitle} 
                    onChange={(e) => setFoodTitle(e.target.value)} 
                    placeholder="e.g. Fresh Artisan Sourdough & Pastry Box" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity Available</label>
                    <input 
                      type="text" 
                      required 
                      value={foodQuantity} 
                      onChange={(e) => setFoodQuantity(e.target.value)} 
                      placeholder="e.g. 5 Boxes"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500" 
                    />
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
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Description & Dietary Notes</label>
                  <textarea 
                    rows={3} 
                    required 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Describe fresh ingredients, dietary tags (Halal, Vegan, Organic), or pickup instructions..." 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none" 
                  />
                </div>

                {/* PRICE OR 100% FREE TOGGLE */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Offer 100% FREE to Community</span>
                      <span className="text-[10px] text-slate-400 block">Give food away at zero cost to vulnerable local families</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setIsFree(!isFree)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${isFree ? 'bg-emerald-600 justify-end' : 'bg-slate-800 justify-start'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                    </button>
                  </div>

                  {!isFree && (
                    <div className="pt-2 border-t border-slate-800">
                      <label className="block text-xs font-semibold text-amber-300 mb-1">Time Equity Price (Minutes)</label>
                      <input 
                        type="number" 
                        value={timeValue} 
                        onChange={(e) => setTimeValue(e.target.value)} 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold" 
                      />
                    </div>
                  )}
                </div>

                {/* SHOWCASE PHOTOS */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Attach Food Photos (Max 3)</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {photos.map((url, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 h-20 bg-slate-950">
                        <img src={url} alt="Food preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => handleRemovePhoto(idx)} 
                          className="absolute top-1 right-1 bg-slate-950/80 text-rose-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {photos.length < 3 && (
                      <div className="border-2 border-dashed border-slate-800 rounded-xl h-20 flex flex-col items-center justify-center p-2 text-slate-500">
                        <ImageIcon className="w-5 h-5 mb-1" />
                        <span className="text-[9px]">Select Sample Below</span>
                      </div>
                    )}
                  </div>

                  {photos.length < 3 && (
                    <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 font-medium block">Quick Add Sample Food Photos:</span>
                      <div className="flex gap-2">
                        {sampleFoodPhotos.map((url, i) => (
                          <button 
                            key={i} 
                            type="button" 
                            onClick={() => handleAddSamplePhoto(url)} 
                            className="text-[10px] text-amber-400 hover:underline font-mono bg-amber-950/40 border border-amber-900/60 px-2 py-0.5 rounded"
                          >
                            + Photo {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Publish Surplus Food Offer
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center mx-auto text-amber-400">
                <Store className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-white">Merchant Partner Sign In Required</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Sign in or register your food business to start posting surplus meals, tracking food waste reduction, and redeeming Time Minutes for operational labor.
              </p>
              <a 
                href="/auth" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg"
              >
                <LogIn className="w-4 h-4" /> Sign In / Register Merchant Account
              </a>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
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
            href="/merchant"
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all flex-1"
            title="Post Offer"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center -mt-5 shadow-lg shadow-amber-500/40 ring-4 ring-slate-950">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-0.5">Post</span>
          </a>

          <a
            href="/merchant"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-amber-400 font-bold transition-all flex-1"
          >
            <Utensils className="w-5 h-5 scale-110 text-amber-400" />
            <span className="text-[10px] tracking-tight">Merchant</span>
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

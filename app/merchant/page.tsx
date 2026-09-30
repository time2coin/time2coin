'use client';
import CountrySelector from '@/components/CountrySelector';
import { SUPPORTED_JURISDICTIONS, formatLocalCurrency } from '@/lib/jurisdictions';
import React, { useState, useEffect } from 'react';
import { 
  Utensils, Store, ArrowRight, ShieldCheck, CheckCircle2, 
  Sparkles, Leaf, LogIn, Plus, Send, ArrowLeft, LogOut,
  Image as ImageIcon, X, ZoomIn, HeartHandshake, Eye, Clock,
  SlidersHorizontal, Building2, Heart, Shield, Menu
} from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Post Surplus Food Form State (Logged-In Merchants)
  const [foodTitle, setFoodTitle] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('5');
  const [timeValue, setTimeValue] = useState('45');
  const [isFree, setIsFree] = useState(false);
  const [pickupWindow, setPickupWindow] = useState('5:00 PM - 7:00 PM');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [postSuccess, setPostSuccess] = useState(false);

  // Lightbox Modal State for Enlarged Image Focus
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Pre-populated sample photos for easy demonstration
  const sampleFoodPhotos = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80'
  ];

  // Sample Published Merchant Items
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    if (photos.length + files.length > 3) {
      alert('You can upload a maximum of 3 photos.');
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPhotos(prev => [...prev, reader.result as string].slice(0, 3));
        }
      };
      reader.readAsDataURL(file);
    });
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
          
          <div className="flex items-center gap-2">
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
        {/* VALUE PROPOSITIONS */}
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

        {/* CONDITIONALLY RENDERED POSTING FORM VS REGISTRATION GATE */}
        <div className="bg-slate-900 border border-amber-800/40 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
          {currentUser ? (
            /* LOGGED-IN VERIFIED MERCHANT DASHBOARD */
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

                {/* PRICING & FREE OPTION TOGGLE */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-emerald-400" /> Pricing Option
                    </label>

                    <label className="inline-flex items-center cursor-pointer gap-2">
                      <input 
                        type="checkbox" 
                        checked={isFree} 
                        onChange={(e) => {
                          setIsFree(e.target.checked);
                          if (e.target.checked) setTimeValue('0');
                        }}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 relative"></div>
                      <span className="text-xs font-bold text-emerald-400">Offer 100% FREE (0 Mins)</span>
                    </label>
                  </div>

                  {!isFree ? (
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Time Minutes Value (Price)</label>
                      <input 
                        type="number" 
                        required={!isFree}
                        value={timeValue} 
                        onChange={(e) => setTimeValue(e.target.value)} 
                        placeholder="45"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500" 
                      />
                    </div>
                  ) : (
                    <div className="p-2.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-[11px] text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>This item will be listed as <strong>FREE Community Food (0 Time Minutes)</strong> for instant neighbor pickup.</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Item Description</label>
                  <textarea 
                    required 
                    rows={3} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Describe ingredients, dietary details (e.g. Vegan/Halal), packaging, and pickup instructions..." 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none" 
                  />
                </div>

                {/* PHOTO UPLOAD SECTION (MAX 3 SMALL PHOTOS) */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-amber-400" /> Food Photos (Max 3 Small Photos)
                    </label>
                    <span className="text-[10px] text-slate-400">{photos.length}/3 attached</span>
                  </div>

                  {/* THUMBNAIL PREVIEW GRID */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {photos.map((photo, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-square">
                          <img src={photo} alt={`Food preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-1 right-1 bg-slate-950/80 hover:bg-rose-600 text-white rounded-full p-1 transition"
                            title="Remove Photo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {photos.length < 3 && (
                    <div className="space-y-2">
                      <label className="block border-2 border-dashed border-slate-800 hover:border-amber-500/60 rounded-xl p-3 text-center cursor-pointer transition bg-slate-900/50">
                        <ImageIcon className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <span className="text-xs font-semibold text-slate-300 block">Click to upload food photos</span>
                        <span className="text-[10px] text-slate-500 block">PNG, JPG, or WEBP up to 5MB</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          onChange={handleFileUpload} 
                          className="hidden" 
                        />
                      </label>

                      {/* QUICK SAMPLE PHOTO PICKER FOR DEMONSTRATION */}
                      <div className="pt-1">
                        <span className="text-[10px] text-slate-400 block mb-1">Or click sample food photos to test:</span>
                        <div className="flex gap-2">
                          {sampleFoodPhotos.map((url, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleAddSamplePhoto(url)}
                              className="w-12 h-12 rounded-lg overflow-hidden border border-slate-800 hover:border-amber-400 transition shrink-0 relative"
                              title="Add Sample Photo"
                            >
                              <img src={url} alt="Sample food" className="w-full h-full object-cover" />
                              <Plus className="w-3.5 h-3.5 text-white bg-slate-950/70 rounded-full absolute bottom-0.5 right-0.5" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Publish Food Offer
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

        {/* LIVE PUBLISHED MERCHANT OFFERS SHOWCASE WITH LIGHTBOX */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white">Live Merchant Food Offers</h2>
              <p className="text-xs text-slate-400">Tap on any small photo to enlarge for a focused view.</p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-950 border border-amber-800 px-3 py-1 rounded-full">
              {publishedOffers.length} Active Offers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishedOffers.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-amber-800/40 hover:border-amber-500/60 rounded-2xl p-5 space-y-4 transition shadow-lg flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-amber-300 bg-amber-950 border border-amber-800 px-2.5 py-0.5 rounded-full">
                      {item.merchantName}
                    </span>

                    {item.isFree ? (
                      <span className="text-xs font-black text-emerald-300 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1">
                        <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" /> FREE GIVE
                      </span>
                    ) : (
                      <span className="text-sm font-black text-amber-300">
                        {item.timeValue} <span className="text-xs text-slate-400 font-normal">Mins</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                    <span>Quantity: <strong className="text-slate-200">{item.quantity}</strong></span>
                    <span>Pickup: <strong className="text-amber-300">{item.pickupWindow}</strong></span>
                  </div>

                  {/* PHOTO THUMBNAILS GRID (MAX 3) WITH ENLARGE CLICK */}
                  {item.photos && item.photos.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 block mb-1 font-semibold flex items-center gap-1">
                        <Eye className="w-3 h-3 text-amber-400" /> Food Photos ({item.photos.length}) — Click to enlarge:
                      </span>
                      <div className="flex gap-2">
                        {item.photos.map((imgUrl, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setSelectedImage(imgUrl)}
                            className="w-20 h-20 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 cursor-pointer relative group shrink-0"
                          >
                            <img src={imgUrl} alt={`${item.title} ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition" />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <ZoomIn className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{item.createdAt}</span>
                  <a href="/#directory" className="px-4 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1 shadow-md">
                    Redeem Meal <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR ENLARGED PHOTO VIEW */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl p-2 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-slate-950/80 hover:bg-rose-600 text-white rounded-full p-2 transition z-10"
              title="Close Image"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged focus view" 
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* PERSISTENT MOBILE BOTTOM NAVIGATION BAR FOR PARTNER PAGES */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur border-t border-slate-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-stretch justify-around px-2 pt-1.5 pb-2">
          {/* HOME */}
          <a
            href="/"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1"
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </a>

          {/* BROWSE DIRECTORY */}
          <a
            href="/#directory"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all flex-1"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Directory</span>
          </a>

          {/* RAISED CENTER + POST BUTTON */}
          <a
            href={currentUser ? "/#post" : "/auth"}
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all flex-1"
            title="Post Food / Skill Offer"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center -mt-5 shadow-lg shadow-amber-500/40 ring-4 ring-slate-950">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold mt-0.5 text-amber-400">
              Post
            </span>
          </a>

          {/* ACTIVE PARTNER PORTAL TAB */}
          <a
            href="/merchant"
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-amber-400 font-bold transition-all flex-1"
          >
            <Utensils className="w-5 h-5 scale-110" />
            <span className="text-[10px] tracking-tight">Merchant</span>
          </a>

          {/* ACCOUNT / SIGN IN */}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl text-slate-400 hover:text-rose-400 transition-all flex-1"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">Sign Out</span>
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

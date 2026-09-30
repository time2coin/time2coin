'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface JurisdictionOption {
  id: string;
  countryCode: string;
  countryName: string;
  currencyCode: string;
  currencySymbol: string;
  flagEmoji: string;
  mealCostFiat: number;
}

export const JURISDICTIONS: JurisdictionOption[] = [
  {
    id: 'MY-MYR',
    countryCode: 'MY',
    countryName: 'Malaysia',
    currencyCode: 'MYR',
    currencySymbol: 'RM',
    flagEmoji: '🇲🇾',
    mealCostFiat: 6.00,
  },
  {
    id: 'UK-GBP',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    currencyCode: 'GBP',
    currencySymbol: '£',
    flagEmoji: '🇬🇧',
    mealCostFiat: 5.00,
  },
  {
    id: 'SG-SGD',
    countryCode: 'SG',
    countryName: 'Singapore',
    currencyCode: 'SGD',
    currencySymbol: 'S$',
    flagEmoji: '🇸🇬',
    mealCostFiat: 5.00,
  },
  {
    id: 'ID-IDR',
    countryCode: 'ID',
    countryName: 'Indonesia',
    currencyCode: 'IDR',
    currencySymbol: 'Rp',
    flagEmoji: '🇮🇩',
    mealCostFiat: 20000,
  },
  {
    id: 'IN-INR',
    countryCode: 'IN',
    countryName: 'India',
    currencyCode: 'INR',
    currencySymbol: '₹',
    flagEmoji: '🇮🇳',
    mealCostFiat: 80.00,
  },
  {
    id: 'TH-THB',
    countryCode: 'TH',
    countryName: 'Thailand',
    currencyCode: 'THB',
    currencySymbol: '฿',
    flagEmoji: '🇹🇭',
    mealCostFiat: 60.00,
  },
  {
    id: 'US-USD',
    countryCode: 'US',
    countryName: 'United States',
    currencyCode: 'USD',
    currencySymbol: '$',
    flagEmoji: '🇺🇸',
    mealCostFiat: 6.00,
  },
  {
    id: 'EU-EUR',
    countryCode: 'EU',
    countryName: 'Eurozone',
    currencyCode: 'EUR',
    currencySymbol: '€',
    flagEmoji: '🇪🇺',
    mealCostFiat: 6.00,
  },
  {
    id: 'AU-AUD',
    countryCode: 'AU',
    countryName: 'Australia',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    flagEmoji: '🇦🇺',
    mealCostFiat: 8.00,
  },
];

interface CountrySelectorProps {
  userJurisdictionId?: string;
  onJurisdictionChange?: (jurisdiction: JurisdictionOption) => void;
  className?: string;
}

export default function CountrySelector({ 
  userJurisdictionId, 
  onJurisdictionChange, 
  className = '' 
}: CountrySelectorProps) {
  const [selected, setSelected] = useState<JurisdictionOption>(JURISDICTIONS[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Priority: User prop if logged in
    if (userJurisdictionId) {
      const match = JURISDICTIONS.find((j) => j.id === userJurisdictionId);
      if (match) {
        setSelected(match);
        return;
      }
    }

    // 2. Read saved jurisdiction from cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const savedId = getCookie('time2coin_jurisdiction');
    if (savedId) {
      const match = JURISDICTIONS.find((j) => j.id === savedId);
      if (match) setSelected(match);
    }
  }, [userJurisdictionId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: JurisdictionOption) => {
    setSelected(option);
    setIsOpen(false);

    // Save selection to cookie (1 year expiration)
    document.cookie = `time2coin_jurisdiction=${option.id}; path=/; max-age=31536000; SameSite=Lax`;

    if (onJurisdictionChange) {
      onJurisdictionChange(option);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Shortened ultra-compact trigger for mobile to protect header space */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold transition shadow-sm hover:border-cyan-500/50"
        title="Switch Region / Currency"
      >
        <span className="text-sm sm:text-base leading-none">{selected.flagEmoji}</span>
        <span className="font-bold text-slate-100 text-xs">{selected.currencySymbol}</span>
        <span className="text-[10px] text-slate-400 uppercase font-mono hidden sm:inline">
          ({selected.currencyCode})
        </span>
        <svg
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-800">
          <div className="p-2.5 bg-slate-950/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Select Region / Currency
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              1h = 1h Universal Time Equity. Fiat is localized.
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
            {JURISDICTIONS.map((j) => {
              const isSelected = j.id === selected.id;
              return (
                <button
                  key={j.id}
                  onClick={() => handleSelect(j)}
                  className={`w-full text-left px-2.5 sm:px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-cyan-950/60 text-cyan-200 border border-cyan-800/50 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <span className="text-base sm:text-lg leading-none shrink-0">{j.flagEmoji}</span>
                    <div className="min-w-0">
                      <div className="font-semibold leading-tight truncate">{j.countryName}</div>
                      <div className="text-[10px] text-slate-400 truncate">
                        Meal Pass: <span className="text-emerald-400 font-mono">{j.currencySymbol} {j.mealCostFiat.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold shrink-0 ml-1">
                    {j.currencyCode}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-2 bg-slate-950/70 text-center">
            <span className="text-[10px] text-slate-400">🌐 Digital services visible globally</span>
          </div>
        </div>
      )}
    </div>
  );
}

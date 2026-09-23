'use client';

import React, { useState } from 'react';
import { Clock, ShieldCheck, HeartHandshake, Award, Lock, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

export default function Time2CoinDashboard() {
  const [walletBalance, setWalletBalance] = useState<number>(120);
  const [activeScenario, setActiveScenario] = useState<'ALPHA' | 'BETA'>('ALPHA');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      {/* Top Scenario Banner */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6">
        <div>
          <h1 className="text-xl font-bold text-amber-400">time2coin Dashboard</h1>
          <p className="text-xs text-slate-400">1 Hour = 1 Hour Universal Time Equity</p>
        </div>
        <button 
          onClick={() => setActiveScenario(activeScenario === 'ALPHA' ? 'BETA' : 'ALPHA')}
          className="flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-medium"
        >
          <Sliders className="w-4 h-4" /> Mode: {activeScenario === 'ALPHA' ? 'Scenario Alpha (Cloud Sync)' : 'Scenario Beta (Offline BLE Mesh)'}
        </button>
      </div>

      {/* Wallet Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="text-xs text-slate-400 mb-1">YOUR TIME WALLET BALANCE</div>
        <div className="text-4xl font-extrabold text-amber-400 flex items-center gap-2">
          <Clock className="w-8 h-8" /> {walletBalance} <span className="text-sm font-normal text-slate-300">Minutes</span>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-emerald-400 flex items-center gap-1">
          <HeartHandshake className="w-4 h-4" /> You funded 4.8 mins of local mutual aid this month!
        </div>
      </div>
    </div>
  );
}

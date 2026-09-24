'use client';

import React, { useState } from 'react';
import { Utensils, Award, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function MerchantPortal() {
  const [accumulatedCoins, setAccumulatedCoins] = useState<number>(380);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <a href="/" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </a>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Utensils className="w-7 h-7 text-amber-400" /> Restaurant Merchant Portal
            </h1>
            <p className="text-xs text-slate-400">Post Surplus Food & Redeem Corporate CSR Cash Pool</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white">CSR Cash Pool Settlement Vault</h2>
          <p className="text-xs text-slate-400">Accumulate 500 Time Coins from community food redemptions to trigger \$250 cash payout.</p>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-300">Accumulated Time Coins: {accumulatedCoins} / 500</span>
              <span className="text-amber-400">{Math.floor((accumulatedCoins / 500) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${(accumulatedCoins / 500) * 100}%` }} />
            </div>
          </div>

          <button onClick={() => alert("Payout request submitted to Tier 2 Clearinghouse Auditor!")} className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition">
            Submit \$250 CSR Cash Payout Claim
          </button>
        </div>
      </main>
    </div>
  );
}

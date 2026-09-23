'use client';

import React, { useState } from 'react';
import { Shield, Sliders, AlertTriangle, Check, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [providerSplit, setProviderSplit] = useState<number>(95);
  const [mutualAidSplit, setMutualAidSplit] = useState<number>(4);
  const [maintainerSplit, setMaintainerSplit] = useState<number>(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6">
        <h1 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <Shield className="w-6 h-6 text-amber-400" /> time2coin Super Admin Vault
        </h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-400" /> Feature 5 Fractional Reserve Ratio
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-2xl font-bold text-amber-400">{providerSplit}%</div>
            <div className="text-xs text-slate-400">Net Provider</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-2xl font-bold text-emerald-400">{mutualAidSplit}%</div>
            <div className="text-xs text-slate-400">Mutual Aid Pool</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-2xl font-bold text-blue-400">{maintainerSplit}%</div>
            <div className="text-xs text-slate-400">Maintainer Reserve</div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Sliders, Download, FileText, Database, Users, 
  AlertTriangle, RefreshCw, CheckCircle2, Search, Lock, ArrowLeft, LogIn, LogOut
} from 'lucide-react';

export default function AdminControlVault() {
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3 | 4>(4);
  const [providerSplit, setProviderSplit] = useState<number>(95);
  const [mutualAidSplit, setMutualAidSplit] = useState<number>(4);
  const [vaultSplit, setVaultSplit] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<any>(null);

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

  const handleExportData = (type: 'users' | 'ledger' | 'audit' | 'sql') => {
    alert(`Initiating 1-Click Data Extraction for: [${type.toUpperCase()}]\nDownloading secure CSV/JSON raw dataset...`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <a href="/" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </a>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-emerald-400" /> Staff Admin Control Vault
            </h1>
            <p className="text-xs text-slate-400">Role-Based Access Control (RBAC) • Tiers 1 through 4</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              <div className="text-right">
                <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-400 block">{currentUser.role}</span>
              </div>
              <button onClick={handleLogout} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition ml-1" title="Logout">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <a href="/auth" className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5">
              <LogIn className="w-3.5 h-3.5" /> Admin Login
            </a>
          )}

          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-2xl">
            {[1, 2, 3, 4].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedTier === tier
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tier {tier}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                Active Staff Role: Tier {selectedTier} {selectedTier === 4 ? '(Super Admin / Founder)' : selectedTier === 3 ? '(Regional Manager)' : selectedTier === 2 ? '(Clearinghouse Auditor)' : '(Support & Moderator)'}
              </span>
              <p className="text-xs text-slate-300">
                {selectedTier === 4 ? 'Full system governance, 360° visibility, parameter sliders, and 1-click backend data extraction.' : selectedTier === 3 ? 'Regional pilot monitoring and local merchant onboarding.' : selectedTier === 2 ? 'Merchant 500-coin cash payout audits & CSR corporate credit receipts.' : 'User dispute ticket resolution and NLP content safety alerts.'}
              </p>
            </div>
          </div>
        </div>

        {selectedTier === 4 && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" /> Feature 5 Reserve Parameter Sliders
            </h2>
            <p className="text-xs text-slate-400">Adjust automated exchange split percentages across the platform.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-400">Net Provider Split</span>
                  <span className="text-white">{providerSplit}%</span>
                </div>
                <input type="range" min={90} max={98} value={providerSplit} onChange={(e) => setProviderSplit(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-cyan-400">Mutual Aid Reserve</span>
                  <span className="text-white">{mutualAidSplit}%</span>
                </div>
                <input type="range" min={1} max={8} value={mutualAidSplit} onChange={(e) => setMutualAidSplit(Number(e.target.value))} className="w-full accent-cyan-500" />
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-blue-400">Platform Maintainer Vault</span>
                  <span className="text-white">{vaultSplit}%</span>
                </div>
                <input type="range" min={0.5} max={3} step={0.5} value={vaultSplit} onChange={(e) => setVaultSplit(Number(e.target.value))} className="w-full accent-blue-500" />
              </div>
            </div>
          </section>
        )}

        {(selectedTier === 4 || selectedTier === 2) && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-400" /> 1-Click Backend Data Extraction Engine
            </h2>
            <p className="text-xs text-slate-400">Extract raw system datasets and compliance audit logs instantly.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button onClick={() => handleExportData('users')} className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left transition space-y-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="block text-xs font-bold text-white">Export Users CSV</span>
              </button>

              <button onClick={() => handleExportData('ledger')} className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left transition space-y-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span className="block text-xs font-bold text-white">Export Ledger JSON</span>
              </button>

              <button onClick={() => handleExportData('audit')} className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left transition space-y-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="block text-xs font-bold text-white">ESG Impact Audit PDF</span>
              </button>

              <button onClick={() => handleExportData('sql')} className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-left transition space-y-2">
                <Database className="w-5 h-5 text-purple-400" />
                <span className="block text-xs font-bold text-white">Full Database SQL</span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

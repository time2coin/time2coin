'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Sliders, Download, FileText, Database, Users, 
  AlertTriangle, RefreshCw, CheckCircle2, Search, Lock, ArrowLeft, LogOut, Check, X, Key, Globe, Save
} from 'lucide-react';

const TIERS_LIST = [1, 2, 3, 4] as const;

export default function AdminControlVault() {
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3 | 4>(4);
  const [providerSplit, setProviderSplit] = useState<number>(95);
  const [mutualAidSplit, setMutualAidSplit] = useState<number>(4);
  const [vaultSplit, setVaultSplit] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Direct Admin Credentials
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Static Narrative / Multi-Language Content State
  const [activeLang, setActiveLang] = useState<'en' | 'ms'>('en');
  const [narratives, setNarratives] = useState<Record<string, { en: string; ms: string }>>({
    'menu.home': { en: 'Home', ms: 'Utama' },
    'menu.merchant': { en: 'Merchant', ms: 'Peniaga' },
    'menu.corporate': { en: 'Corporate', ms: 'Korporat' },
    'menu.vision': { en: 'Vision & Mission', ms: 'Visi & Misi' },
    'menu.signin': { en: 'Sign In / Sign Out', ms: 'Log Masuk / Keluar' },
    'hero.title': { en: 'Replacing Cash Friction with Universal Time Equity', ms: 'Menggantikan Geseran Tunai dengan Ekuiti Masa Universal' },
    'hero.subtitle': { en: 'time2coin values every human hour equally (1 Hour = 1 Hour). Earn time credits through bicycle repair, elder care, or skill sharing—and spend those same coins on local restaurant surplus food or mutual aid care without cash.', ms: 'time2coin menilai setiap jam manusia secara saksama (1 Jam = 1 Jam). Raih kredit masa melalui pembaikan basikal, penjagaan warga emas, atau perkongsian kemahiran.' },
    'badge.providerPay': { en: '95% Provider Pay', ms: '95% Bayaran Penyedia' },
    'badge.mutualAid': { en: '4% Mutual Aid', ms: '4% Bantuan Bersama' },
    'badge.platformVault': { en: '1% Platform Vault', ms: '1% Tabung Platform' }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Pending Applicant Queue State
  const [pendingApplicants, setPendingApplicants] = useState<any[]>([
    { email: 'bistro@eatlocal.com', name: 'Artisan Cafe & Bakery', role: 'merchant', date: '10 mins ago' },
    { email: 'esg@techcorp.io', name: 'Global Tech Innovations ESG', role: 'corporate', date: '1 hour ago' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('time2coin_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'admin') {
          setCurrentUser(parsed);
        }
      } catch (e) {}
    }

    const storedPending = JSON.parse(localStorage.getItem('time2coin_pending_approvals') || '[]');
    if (storedPending.length > 0) {
      setPendingApplicants(prev => [...prev, ...storedPending]);
    }

    const storedNarratives = localStorage.getItem('time2coin_narratives');
    if (storedNarratives) {
      try {
        setNarratives(JSON.parse(storedNarratives));
      } catch(e) {}
    }
  }, []);

  const handleDirectAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (adminEmail === 'admin@time2coin.app' && adminPassword === 'SuperAdmin2026!') {
      const adminUser = {
        email: 'admin@time2coin.app',
        password: 'SuperAdmin2026!',
        role: 'admin',
        name: 'Founder / Super Admin',
        redirect: '/admin'
      };
      localStorage.setItem('time2coin_user', JSON.stringify(adminUser));
      setCurrentUser(adminUser);
    } else {
      setLoginError('Invalid Admin credentials.');
    }
  };

  const handleSaveNarratives = () => {
    localStorage.setItem('time2coin_narratives', JSON.stringify(narratives));
    localStorage.setItem('time2coin_active_lang', activeLang);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleNarrativeChange = (key: string, lang: 'en' | 'ms', value: string) => {
    setNarratives(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: value
      }
    }));
  };

  const handleApproveApplicant = (email: string) => {
    setPendingApplicants(prev => prev.filter(a => a.email !== email));
    alert(`APPROVED: Applicant [${email}] has been verified and granted access!`);
  };

  const handleRejectApplicant = (email: string) => {
    setPendingApplicants(prev => prev.filter(a => a.email !== email));
    alert(`REJECTED: Application [${email}] declined.`);
  };

  const handleLogout = () => {
    localStorage.removeItem('time2coin_user');
    setCurrentUser(null);
  };

  const handleExportData = (type: 'users' | 'ledger' | 'audit' | 'sql') => {
    alert(`Initiating 1-Click Data Extraction for: [${type.toUpperCase()}]\nDownloading raw CSV/JSON dataset...`);
  };

  // STRICT GATING: IF NOT LOGGED IN AS ADMIN, RENDER ONLY THE LOGIN CARD
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-950/80 border border-emerald-800 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-extrabold text-white">Super Admin Control Vault</h1>
            <p className="text-xs text-slate-400">Restricted Access • Please authenticate to continue</p>
          </div>

          <form onSubmit={handleDirectAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@time2coin.app"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" /> Authenticate Super Admin Vault
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-800">
            <a href="/" className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Public App
            </a>
          </div>
        </div>
      </div>
    );
  }

  // IF LOGGED IN AS ADMIN: RENDER FULL ADMIN VAULT
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6">
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <a href="/" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </a>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-emerald-400" /> Staff Admin Control Vault
            </h1>
            <p className="text-xs text-slate-400">Role-Based Access Control (RBAC) • Tiers 1 through 4</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <div className="text-right">
              <span className="text-xs font-bold text-white block">{currentUser.name}</span>
              <span className="text-[10px] text-emerald-400 block">{currentUser.role}</span>
            </div>
            <button onClick={handleLogout} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition ml-1" title="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-2xl">
            {TIERS_LIST.map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedTier === tier ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Tier {tier}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* DYNAMIC NARRATIVE & DUAL-LANGUAGE EDITOR */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" /> Dynamic Narrative & Dual-Language Manager
              </h2>
              <p className="text-xs text-slate-400">Edit app headers, menus, and landing copy dynamically without modifying source code.</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setActiveLang('en')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${activeLang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => setActiveLang('ms')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${activeLang === 'ms' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
                >
                  Bahasa Melayu (MS)
                </button>
              </div>

              <button
                onClick={handleSaveNarratives}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Static narrative and language settings updated successfully across all app pages!</span>
            </div>
          )}

          <div className="space-y-4">
            {Object.keys(narratives).map((key) => (
              <div key={key} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-cyan-400 font-bold">{key}</span>
                  <span className="text-[10px] text-slate-500 uppercase">Field Key</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">English Text</label>
                    <input
                      type="text"
                      value={narratives[key]?.en || ''}
                      onChange={(e) => handleNarrativeChange(key, 'en', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Bahasa Melayu Translation</label>
                    <input
                      type="text"
                      value={narratives[key]?.ms || ''}
                      onChange={(e) => handleNarrativeChange(key, 'ms', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIER APPROVAL QUEUE */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" /> Merchant & Corporate Approval Queue
              </h2>
              <p className="text-xs text-slate-400">Review pending business applications requiring manual Admin verification.</p>
            </div>
            <span className="text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-full">
              {pendingApplicants.length} Pending
            </span>
          </div>

          {pendingApplicants.length === 0 ? (
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              All business applications have been processed! No pending approvals in queue.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApplicants.map((app) => (
                <div key={app.email} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${app.role === 'merchant' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-purple-950 text-purple-300 border border-purple-800'}`}>
                        {app.role} Application
                      </span>
                      <h4 className="font-bold text-white text-sm">{app.name}</h4>
                    </div>
                    <span className="text-xs text-slate-400 block mt-1">{app.email} • Applied {app.date}</span>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleApproveApplicant(app.email)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md">
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => handleRejectApplicant(app.email)} className="px-3 py-1.5 bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* TIER 4: PARAMETER SLIDERS */}
        {selectedTier === 4 && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" /> Feature 5 Reserve Parameter Sliders
            </h2>
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

        {/* DATA EXTRACTION ENGINE */}
        {(selectedTier === 4 || selectedTier === 2) && (
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-400" /> 1-Click Backend Data Extraction Engine
            </h2>
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

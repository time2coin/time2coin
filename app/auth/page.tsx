'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, User, Utensils, Building2, Key, ArrowLeft, 
  CheckCircle2, Sparkles, AlertCircle, LogIn, LogOut, HeartHandshake, Clock
} from 'lucide-react';

type UserRole = 'member' | 'donor' | 'merchant' | 'corporate' | 'admin';

export default function AuthModule() {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [role, setRole] = useState<UserRole>('member');
  
  // Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  
  // Status States
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'pending'; text: string } | null>(null);

  // Pre-configured Test Accounts
  const demoAccounts = {
    admin: { email: 'admin@time2coin.app', password: 'SuperAdmin2026!', role: 'admin', status: 'APPROVED', name: 'Founder Admin', redirect: '/admin' },
    member: { email: 'member@time2coin.app', password: 'Member2026!', role: 'member', status: 'APPROVED', name: 'Sarah Jenkins', redirect: '/' },
    donor: { email: 'donor@time2coin.app', password: 'Donor2026!', role: 'donor', status: 'APPROVED', name: 'Alex Rivera (Donor)', redirect: '/corporate' },
    merchant: { email: 'merchant@time2coin.app', password: 'Merchant2026!', role: 'merchant', status: 'APPROVED', name: 'Green Garden Bistro', redirect: '/merchant' },
    corporate: { email: 'corporate@time2coin.app', password: 'Corporate2026!', role: 'corporate', status: 'APPROVED', name: 'Acme Corp ESG', redirect: '/corporate' }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Check stored user or demo accounts
    const target = demoAccounts[role as keyof typeof demoAccounts];
    if (email === target?.email && password === target?.password) {
      if (target.status === 'PENDING_ADMIN_APPROVAL') {
        setMessage({ type: 'pending', text: 'Your registration is currently pending Super Admin review. You will receive an email once approved.' });
        return;
      }
      localStorage.setItem('time2coin_user', JSON.stringify(target));
      setMessage({ type: 'success', text: `Welcome back, ${target.name}! Redirecting...` });
      setTimeout(() => window.location.href = target.redirect, 1000);
    } else {
      setMessage({ type: 'error', text: 'Invalid credentials. Use 1-Click Quick Login shortcuts below for testing.' });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const requiresApproval = role === 'merchant' || role === 'corporate';
    const newUser = {
      email,
      password,
      role,
      name: orgName || fullName || email.split('@')[0],
      status: requiresApproval ? 'PENDING_ADMIN_APPROVAL' : 'APPROVED',
      redirect: role === 'admin' ? '/admin' : role === 'merchant' ? '/merchant' : role === 'corporate' || role === 'donor' ? '/corporate' : '/'
    };

    if (requiresApproval) {
      // Store in pending queue for Admin review
      const pendingQueue = JSON.parse(localStorage.getItem('time2coin_pending_approvals') || '[]');
      pendingQueue.push(newUser);
      localStorage.setItem('time2coin_pending_approvals', JSON.stringify(pendingQueue));

      setMessage({
        type: 'pending',
        text: `Application Submitted! ${role.toUpperCase()} accounts require manual Admin approval. Tier 1/4 Admins will review your registration shortly.`
      });
    } else {
      // Auto approve Public Users & Donors
      localStorage.setItem('time2coin_user', JSON.stringify(newUser));
      setMessage({
        type: 'success',
        text: `Account Created Successfully! Welcome bonus of 60 Time Coins credited. Redirecting...`
      });
      setTimeout(() => window.location.href = newUser.redirect, 1200);
    }
  };

  const handleQuickDemoLogin = (selectedRole: keyof typeof demoAccounts) => {
    const target = demoAccounts[selectedRole];
    localStorage.setItem('time2coin_user', JSON.stringify(target));
    setMessage({ type: 'success', text: `Logging in as ${target.name}...` });
    setTimeout(() => window.location.href = target.redirect, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 flex flex-col justify-between">
      <div className="max-w-xl mx-auto w-full">
        <header className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
          <a href="/" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition flex items-center gap-2 text-xs font-semibold text-slate-300">
            <ArrowLeft className="w-4 h-4" /> Back to App
          </a>
          <div className="text-right">
            <h1 className="font-bold text-lg text-white tracking-tight">time2coin Security Vault</h1>
            <span className="text-xs text-cyan-400 font-semibold">Unified Authentication Module</span>
          </div>
        </header>

        {/* TOGGLE SIGN IN vs REGISTER */}
        <div className="grid grid-cols-2 gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl mb-6">
          <button
            onClick={() => { setMode('signin'); setMessage(null); }}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${mode === 'signin' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setMessage(null); }}
            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${mode === 'register' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <User className="w-4 h-4" /> Register New Account
          </button>
        </div>

        {/* ROLE TABS */}
        <div className="grid grid-cols-5 gap-1 bg-slate-900 border border-slate-800 p-1 rounded-2xl mb-6 text-[11px]">
          <button onClick={() => { setRole('member'); setEmail('member@time2coin.app'); setPassword('Member2026!'); }} className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1 ${role === 'member' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>
            <User className="w-3 h-3" /> Public
          </button>
          <button onClick={() => { setRole('donor'); setEmail('donor@time2coin.app'); setPassword('Donor2026!'); }} className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1 ${role === 'donor' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>
            <HeartHandshake className="w-3 h-3" /> Donor
          </button>
          <button onClick={() => { setRole('merchant'); setEmail('merchant@time2coin.app'); setPassword('Merchant2026!'); }} className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1 ${role === 'merchant' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>
            <Utensils className="w-3 h-3" /> Merchant
          </button>
          <button onClick={() => { setRole('corporate'); setEmail('corporate@time2coin.app'); setPassword('Corporate2026!'); }} className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1 ${role === 'corporate' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>
            <Building2 className="w-3 h-3" /> Corporate
          </button>
          <button onClick={() => { setRole('admin'); setEmail('admin@time2coin.app'); setPassword('SuperAdmin2026!'); }} className={`py-2 rounded-xl font-bold transition flex items-center justify-center gap-1 ${role === 'admin' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>
            <ShieldCheck className="w-3 h-3" /> Admin
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {role === 'merchant' ? 'Merchant Food Rescue' : role === 'corporate' ? 'ESG Corporate Sponsor' : role === 'donor' ? 'Individual CSR Donor' : role === 'admin' ? 'Super Admin Vault' : 'Public Time Wallet'}
              </span>
              <h2 className="text-lg font-extrabold text-white mt-0.5">
                {mode === 'signin' ? `Sign In as ${role.toUpperCase()}` : `Register as ${role.toUpperCase()}`}
              </h2>
            </div>
            {role === 'merchant' || role === 'corporate' ? (
              <span className="text-[10px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-1 rounded-full">
                Requires Admin Approval
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-full">
                Instant Auto-Approve
              </span>
            )}
          </div>

          {message && (
            <div className={`p-4 rounded-2xl border text-xs flex items-center gap-2.5 ${message.type === 'success' ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200' : message.type === 'pending' ? 'bg-amber-950/80 border-amber-800 text-amber-200' : 'bg-rose-950/80 border-rose-800 text-rose-200'}`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" /> : <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={mode === 'signin' ? handleSignIn : handleRegister} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {role === 'merchant' ? 'Business / Restaurant Name' : role === 'corporate' ? 'Corporate Company Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={role === 'merchant' || role === 'corporate' ? orgName : fullName}
                  onChange={(e) => role === 'merchant' || role === 'corporate' ? setOrgName(e.target.value) : setFullName(e.target.value)}
                  placeholder={role === 'merchant' ? 'e.g. Green Garden Bistro' : role === 'corporate' ? 'e.g. Acme Corp ESG' : 'e.g. Sarah Jenkins'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. user@time2coin.app"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {mode === 'signin' ? `Sign In (${role.toUpperCase()})` : `Submit ${role.toUpperCase()} Application`}
            </button>
          </form>

          {/* 1-CLICK DEMO SHORTCUTS */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              ⚡ 1-Click Quick Demo Login Shortcuts:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => handleQuickDemoLogin('admin')} className="p-2.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-xl text-left transition">
                <span className="font-bold text-emerald-300 block">👑 Super Admin</span>
                <span className="text-[10px] text-slate-400 block truncate">admin@time2coin.app</span>
                <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">SuperAdmin2026!</span>
              </button>

              <button onClick={() => handleQuickDemoLogin('member')} className="p-2.5 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-xl text-left transition">
                <span className="font-bold text-cyan-300 block">👤 Public Member</span>
                <span className="text-[10px] text-slate-400 block truncate">member@time2coin.app</span>
                <span className="text-[10px] font-mono text-cyan-400 block mt-0.5">Member2026!</span>
              </button>

              <button onClick={() => handleQuickDemoLogin('merchant')} className="p-2.5 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 rounded-xl text-left transition">
                <span className="font-bold text-amber-300 block">🏪 Merchant</span>
                <span className="text-[10px] text-slate-400 block truncate">merchant@time2coin.app</span>
                <span className="text-[10px] font-mono text-amber-400 block mt-0.5">Merchant2026!</span>
              </button>

              <button onClick={() => handleQuickDemoLogin('corporate')} className="p-2.5 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 rounded-xl text-left transition">
                <span className="font-bold text-purple-300 block">🏢 Corporate</span>
                <span className="text-[10px] text-slate-400 block truncate">corporate@time2coin.app</span>
                <span className="text-[10px] font-mono text-purple-400 block mt-0.5">Corporate2026!</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-slate-500">
        time2coin Social Enterprise • Universal Time Equity Security Engine
      </footer>
    </div>
  );
}

# time2coin ⏳ – Universal Time Equity & Food Rescue Network

> **Trade Skills & Rescue Surplus Food with Zero Cash.**  
> 1 Hour = 1 Hour Equal Time Equity.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

---

## 🌟 Overview

**time2coin** is a digital social enterprise platform that merges **Universal Time Banking** with **Merchant Surplus Food Rescue**. It eliminates traditional cash friction by establishing **1 Hour of Labor = 60 Time Minutes**, valuing every human skill identically regardless of conventional wage gaps.

Members earn **Time Minutes** by providing skills to neighbors (e.g. bike repair, gardening, elder care, tutoring) and can redeem those credits for neighboring services or fresh surplus meals from local restaurant partners.

---

## ✨ Key Features

* **Universal Time Banking (1:1 Equity)**: Every hour contributed earns 60 Time Minutes in your personal Time Wallet.
* **Merchant Food Rescue**: Spend earned Time Minutes on chef-prepared surplus meals from local bistro & grocery partners.
* **Automated 95/4/1 Reserve Protection**:
  * **95%** credited directly to the service provider.
  * **4%** routed to the local community Mutual Aid Reserve pool for vulnerable neighbors.
  * **1%** allocated to open-source platform maintenance.
* **Safe Holding & 4-Digit Verification PIN**: Credits remain safely held during service execution and are released instantly when the buyer inputs the provider's 4-digit PIN.
* **Interactive Time Calculator**: Live value slider demonstrating what 1–5 hours of labor unlock in community value.
* **Corporate CSR & ESG Impact Portal**: Enables enterprise sponsors to fund community time pools and track verified social/environmental impact.
* **Offline BLE Mesh Queue**: Built for disaster resilience and post-currency barter verification over Bluetooth Low Energy (BLE).

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/)
* **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Realtime Sync)
* **Hosting**: [Vercel](https://vercel.com/) (Zero-cost cloud deployment)
* **PWA Capability**: Mobile-first progressive web app design

---

## 🚀 Quick Start Guide

### 1. Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm** or **yarn**

### 2. Clone the Repository
```bash
git clone https://github.com/time2coin/time2coin.git
cd time2coin
3. Install Dependencies
npm install
4. Configure Environment Variables
Create a .env.local file in the root directory and add your Supabase keys:
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
5. Run the Local Development Server
npm run dev
Open http://localhost:3000 in your browser to view the app.
📁 Repository Structure
time2coin/
├── app/
│   ├── layout.tsx         # Root layout with SEO metadata & global providers
│   ├── page.tsx           # Dynamic public landing & member dashboard
│   ├── auth/              # User sign-in / registration page
│   ├── merchant/          # Restaurant surplus partner portal
│   └── corporate/         # Corporate CSR & ESG impact portal
├── public/
│   ├── Designer.png       # Official time2coin brand logo asset
│   └── favicon.ico        # Site icon
├── supabase/
│   └── schema.sql         # Supabase database schema & Row Level Security (RLS)
├── package.json
└── README.md
📜 License
This project is licensed under the MIT License — free to adapt, fork, and deploy for social enterprise & community time-banking initiatives worldwide.
🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check out the Issues page.

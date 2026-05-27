"use client";
import Link from 'next/link';
import { ArrowRight, Zap, ShieldCheck, TrendingUp, Users, Crown } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 font-sans overflow-hidden relative">
      
      {/* ─── پس‌زمینه نوری مدرن ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-100/50 to-transparent blur-[100px] pointer-events-none -z-10" />

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-blue-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black italic tracking-tighter cursor-default flex items-center gap-1">
            <Crown size={24} className="text-blue-600 mb-1" />
            <span className="text-blue-600">SULTAN</span>
            <span className="text-slate-900 ml-1">NETWORK</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-bold text-slate-600 text-sm uppercase tracking-widest">
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Support</Link>
            <Link href="/login" className="hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
              Join the Empire
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="pt-40 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-bounce border border-blue-100 shadow-sm">
            <Zap size={16} className="text-amber-500" /> #1 Digital Infrastructure & SMM Platform
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
            Dominate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-400 italic drop-shadow-sm">Digital Empire</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            The premium destination for YouTube, TikTok, and Instagram growth. 
            Experience instant delivery, highly secure payments, and world-class IT support.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 hover:scale-105 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.25)] flex items-center justify-center gap-3 group">
              Start Growing Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="w-full sm:w-auto bg-white text-slate-800 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all border border-slate-200 shadow-sm hover:border-blue-200 hover:text-blue-600">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats Section (Trust Building) ─── */}
      <section className="py-20 border-y border-slate-200 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: 'Orders Completed', val: '500K+', icon: ShieldCheck },
            { label: 'Active Users', val: '10K+', icon: Users },
            { label: 'Average Growth', val: '200%', icon: TrendingUp },
            { label: 'Global Servers', val: '150+', icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="text-center group p-6 rounded-3xl hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100">
              <div className="flex justify-center mb-5 text-blue-500 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300 drop-shadow-sm">
                <stat.icon size={36} strokeWidth={1.5} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">{stat.val}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
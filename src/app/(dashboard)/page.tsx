"use client";

import { useState } from 'react';
import { 
  DollarSign, Package, Settings, Bell, 
  Instagram, Music, Youtube, Facebook, Twitch, Radio, 
  ShieldCheck, Zap, PlusCircle
} from 'lucide-react';
import Image from 'next/image';

export default function NewOrderPage() {
  const [activeCategory, setActiveCategory] = useState('Instagram');

  const socialCategories = [
    { name: 'Instagram', icon: Instagram, color: 'text-fuchsia-500', bgHover: 'hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10' },
    { name: 'TikTok', icon: Music, color: 'text-cyan-400', bgHover: 'hover:border-cyan-400/50 hover:bg-cyan-400/10' },
    { name: 'Youtube', icon: Youtube, color: 'text-red-500', bgHover: 'hover:border-red-500/50 hover:bg-red-500/10' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-500', bgHover: 'hover:border-blue-500/50 hover:bg-blue-500/10' },
    { name: 'Spotify', icon: Radio, color: 'text-emerald-500', bgHover: 'hover:border-emerald-500/50 hover:bg-emerald-500/10' },
    { name: 'Twitch', icon: Twitch, color: 'text-purple-500', bgHover: 'hover:border-purple-500/50 hover:bg-purple-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] p-6 sm:p-10 font-sans text-slate-200">
      
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* ─── Top Stats Bar (Premium Dark) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Account Balance", val: "$0.00", icon: DollarSign, color: "text-amber-400" },
            { title: "Total Pipelines", val: "0", icon: Package, color: "text-blue-400" },
            { title: "Active Nodes", val: "0", icon: Settings, color: "text-sky-400" },
            { title: "System Status", val: "Online", icon: Bell, color: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/60 backdrop-blur-xl p-5 rounded-3xl border border-slate-800 shadow-lg flex items-center justify-between group hover:border-slate-700 transition-colors">
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.title}</p>
                <h3 className="font-black text-xl text-white tracking-tight">{stat.val}</h3>
              </div>
              <div className={`p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Category Icons */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-2 gap-4">
            {socialCategories.map((social) => (
              <button 
                key={social.name}
                onClick={() => setActiveCategory(social.name)}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all duration-300 ${
                  activeCategory === social.name 
                    ? 'bg-slate-800 border-slate-600 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                    : `bg-slate-900/40 border-slate-800/80 ${social.bgHover}`
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl mb-3 flex items-center justify-center bg-slate-950 border border-slate-800 shadow-inner ${social.color}`}>
                  <social.icon size={24} />
                </div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{social.name}</p>
              </button>
            ))}
          </div>

          {/* Center: New Order Form (Glassmorphism) */}
          <div className="col-span-1 lg:col-span-5 bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[3rem] shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Deploy Node</h2>
              </div>
              
              <div className="space-y-5">
                {/* Search / Category Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Service Category</label>
                  <select className="w-full p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-white font-semibold outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none">
                    <option>{activeCategory} Followers - Elite Quality</option>
                    <option>{activeCategory} Likes - High Retention</option>
                    <option>{activeCategory} Views - Instant Drop</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Target URL</label>
                  <input placeholder="https://" className="w-full p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Volume</label>
                    <input type="number" placeholder="1000" className="w-full p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-black text-lg tabular-nums" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Est. Cost</label>
                    <div className="w-full p-4 bg-slate-950 rounded-2xl border border-slate-800 text-amber-400 font-black text-lg tabular-nums flex items-center justify-between">
                      <span>$0.00</span>
                      <Zap size={18} className="text-amber-500/50" />
                    </div>
                  </div>
                </div>

                {/* Shimmer Button */}
                <button className="w-full relative overflow-hidden group/btn bg-amber-500 text-slate-950 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                  <PlusCircle size={20} className="relative z-10 group-hover/btn:rotate-90 transition-transform duration-500" />
                  <span className="relative z-10">Execute Order</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Sultan Branding Panel */}
          <div className="col-span-1 lg:col-span-4 bg-gradient-to-b from-blue-900/40 to-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-blue-500/20 flex flex-col items-center justify-center relative overflow-hidden text-center group">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <div className="w-32 h-32 border border-blue-400/30 rounded-full mb-8 flex items-center justify-center bg-slate-950/50 shadow-[inset_0_0_30px_rgba(59,130,246,0.2)] mx-auto group-hover:scale-105 transition-transform duration-700">
                <ShieldCheck size={50} className="text-blue-500" />
              </div>
              
              <h3 className="font-black text-white text-2xl uppercase tracking-tighter mb-2">
                Sultan <span className="text-blue-500">Online</span>
              </h3>
              <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mb-4"></div>
              
              <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.3em] leading-relaxed">
                Premium Infrastructure<br/>For Elite Networks
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
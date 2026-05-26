"use client";
import React from 'react';
import { PhoneCall, Headset, Zap, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const phoneNumber = "13252024023"; 
  const facebookLink = "https://www.facebook.com/share/1JBmzcnyrz/?mibextid=wwXIfr";
  const instagramLink = "https://www.instagram.com/2x_followers?igsh=MTg3MTJsczVmeW5hcQ==";

  return (
    <div className="min-h-[85vh] flex flex-col items-center p-4 sm:p-6 font-sans animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
      
      {/* ─── پس‌زمینه مدرن آبی و سفید ─── */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl w-full space-y-12 relative z-10 pt-8">
        
        {/* هدر صفحه */}
        <div className="text-center space-y-4 relative">
          <div className="inline-flex items-center gap-2 bg-white backdrop-blur-md border border-slate-100 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2 shadow-sm">
            <Headset size={14} /> Sultan Support Team
          </div>
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter drop-shadow-sm text-slate-900">
            SUPPORT <span className="text-blue-600 ml-3">CENTER</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Connect directly with our elite support architects. We are on standby to ensure your digital infrastructure scales flawlessly.
          </p>
        </div>

        {/* گرید کارت‌های پشتیبانی (تم آبی و سفید) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          
          {/* ─── WhatsApp Card ─── */}
          <a 
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.25)] hover:-translate-y-2 transition-all duration-500 flex items-center gap-6"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
            
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-inner border border-blue-100 shrink-0 relative z-10">
              <MessageCircle size={40} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight uppercase italic">WhatsApp</h3>
              <p className="text-slate-500 font-medium text-xs leading-relaxed">Chat with our experts instantly for quick setups.</p>
            </div>
          </a>

          {/* ─── Direct Call Card ─── */}
          <a 
            href={`tel:+${phoneNumber}`}
            className="group relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.25)] hover:-translate-y-2 transition-all duration-500 flex items-center gap-6"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-slate-200/50 rounded-full blur-3xl group-hover:bg-slate-300/50 transition-all duration-500" />
            
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-inner border border-slate-200 shrink-0 relative z-10">
              <PhoneCall size={34} strokeWidth={2} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight uppercase italic">Direct Call</h3>
              <p className="text-slate-500 font-medium text-xs leading-relaxed">Call our international hotline for VIP support.</p>
            </div>
          </a>

          {/* ─── Facebook Card ─── */}
          <a 
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.25)] hover:-translate-y-2 transition-all duration-500 flex items-center gap-6"
          >
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
            
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-inner border border-blue-100 shrink-0 relative z-10">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="40" width="40" xmlns="http://www.w3.org/2000/svg">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight uppercase italic">Facebook</h3>
              <p className="text-slate-500 font-medium text-xs leading-relaxed">Join our community or text via Messenger.</p>
            </div>
          </a>

          {/* ─── Instagram Card ─── */}
          <a 
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_-15px_rgba(236,72,153,0.2)] hover:-translate-y-2 transition-all duration-500 flex items-center gap-6"
          >
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl group-hover:bg-pink-500/10 transition-all duration-500" />
            
            <div className="w-20 h-20 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-gradient-to-tr group-hover:from-blue-500 group-hover:to-pink-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-inner border border-pink-100 shrink-0 relative z-10">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="40" width="40" xmlns="http://www.w3.org/2000/svg">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight uppercase italic">Instagram</h3>
              <p className="text-slate-500 font-medium text-xs leading-relaxed">Check our updates and DM for specialized support.</p>
            </div>
          </a>

        </div>

        {/* نوار وضعیت پشتیبانی */}
        <div className="pt-8 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-xl">
              <Zap size={16} className="text-blue-600" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                System Status: Active
              </span>
              <p className="text-slate-900 text-sm font-bold tracking-wide mt-0.5">
                Avg Response: <span className="text-blue-600 font-black">&lt; 15 Minutes</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
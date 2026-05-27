import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Building, ChevronRight, Instagram, Send, Facebook, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] border-t border-slate-800/80 pt-20 pb-10 overflow-hidden font-sans">
      
      {/* افکت‌های نوری پس‌زمینه برای حالت سه‌بعدی و لوکس (تم آبی) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        
        {/* ستون اول: برند و توضیحات */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group inline-block">
            <div className="relative w-12 h-12 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <Image 
                src="/logo.png" 
                alt="Sultan Online Service Logo" 
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">
                Sultan <span className="text-blue-500">Online</span>
              </span>
            </div>
          </Link>
          <p className="text-slate-400 font-medium text-sm leading-relaxed">
            Leading digital infrastructure and SMM solutions for elite growth. Accelerate your global presence with the most reliable network.
          </p>
          <div className="flex items-center gap-4 pt-2">
             {/* لینک فیسبوک */}
             <a href="https://www.facebook.com/share/1F1NJPStmY/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-900/30 hover:border-blue-500/50 transition-all shadow-inner">
              <Facebook size={18} />
            </a>
            {/* لینک اینستاگرام */}
            <a href="https://www.instagram.com/sultan_online_services?igsh=eXd1cHlsdnlmZm84&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:bg-pink-900/30 hover:border-pink-500/50 transition-all shadow-inner">
              <Instagram size={18} />
            </a>
            {/* لینک تلگرام */}
            <a href="https://t.me/sultan_tech799" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:bg-sky-900/30 hover:border-sky-500/50 transition-all shadow-inner">
              <Send size={18} />
            </a>
          </div>
        </div>

        {/* ستون دوم: لینک‌های سریع */}
        <div>
          <h4 className="font-black text-white mb-6 uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Quick Links
          </h4>
          <div className="flex flex-col gap-4 text-sm font-bold text-slate-400">
            <Link href="/services" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
              <ChevronRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" /> 
              Services & Packages
            </Link>
            <Link href="/terms" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
              <ChevronRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" /> 
              Terms of Service
            </Link>
            <Link href="/privacy" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
              <ChevronRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" /> 
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* ستون سوم: اطلاعات شرکتی */}
        <div>
          <h4 className="font-black text-white mb-6 uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Corporate
          </h4>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Building size={18} className="text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-blue-400 font-black uppercase tracking-widest text-[9px] mb-1">Registered Entity</p>
                <p className="text-sm font-bold text-slate-200">Sultan Online Service LTD</p>
                <p className="text-[10px] text-slate-500 font-black mt-1 uppercase tracking-wider">Company No: 17063286</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-1">
              <MapPin size={18} className="text-slate-500 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Kotai Sangi Yaseeni Center<br />
                Kabul Afghanistan
              </p>
            </div>
          </div>
        </div>

        {/* ستون چهارم: خبرنامه */}
        <div>
          <h4 className="font-black text-white mb-6 uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Network Updates
          </h4>
          <p className="text-xs text-slate-400 font-medium mb-4 leading-relaxed">
            Subscribe to our terminal to receive protocol updates, system statuses, and exclusive node deals.
          </p>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3.5 pl-11 pr-12 text-sm text-white font-medium outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all placeholder:text-slate-600 shadow-inner"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors shadow-md">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* بخش کپی‌رایت پایین */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-800/80 pt-8">
          <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-4 md:mb-0 flex items-center gap-2">
            © 2026 SULTAN ONLINE SERVICE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3 opacity-60">
            <ShieldCheck size={14} className="text-slate-500" />
            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Secured by Stripe & NOWPayments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
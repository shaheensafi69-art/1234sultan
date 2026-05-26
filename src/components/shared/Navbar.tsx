"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, Zap, ShoppingBag, Settings, PhoneIncoming, ChevronRight, Info } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Services', href: '/services', icon: ShoppingBag },
    { name: 'Contact', href: '/dashboard/contact', icon: PhoneIncoming },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 font-sans ${
        scrolled 
          ? 'bg-[#020617]/80 backdrop-blur-2xl border-b border-blue-500/20 shadow-[0_10px_40px_-15px_rgba(37,99,235,0.3)] py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500">
        
        {/* برندینگ و لوگوی سلطان */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all duration-500">
            <Image 
              src="/logo.png" 
              alt="Sultan Online Service Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-md">
              Sultan <span className="text-blue-500">Online</span>
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] mt-0.5 text-blue-200/70">
              Service Infrastructure
            </span>
          </div>
        </Link>

        {/* منوی کامپیوتر (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative text-xs uppercase tracking-widest font-black transition-colors group py-2 ${
                  isActive 
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
                    : 'text-slate-400 hover:text-blue-300'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 rounded-t-full ${
                  isActive ? 'w-full shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            );
          })}

          <Link 
            href="/dashboard/new-order"
            className="ml-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <Zap size={16} className="text-blue-200 group-hover:animate-pulse relative z-10" />
            <span className="relative z-10">Deploy Node</span>
          </Link>
        </div>

        {/* دکمه منوی موبایل */}
        <button 
          className="lg:hidden relative p-2 text-white hover:text-blue-400 transition-colors z-[110]" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* منوی کشویی موبایل */}
      <div 
        className={`lg:hidden fixed inset-0 bg-[#020617]/95 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-[105] flex flex-col justify-center border-t border-blue-900/50 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-8 gap-3">
          <Link 
            href="/dashboard/new-order"
            onClick={() => setIsOpen(false)} 
            className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-2xl mb-6 shadow-[0_15px_30px_rgba(37,99,235,0.3)] active:scale-95 transition-transform relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-2.5 bg-blue-950/50 backdrop-blur-md rounded-xl border border-blue-400/20"><Zap size={24} className="text-blue-300" /></div>
              <span className="text-xl font-black tracking-widest uppercase text-white">Deploy Node</span>
            </div>
            <ChevronRight size={20} className="text-blue-200 relative z-10" />
          </Link>

          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 transform ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                } ${isActive ? 'bg-blue-900/30 border border-blue-500/30 shadow-sm' : 'hover:bg-slate-800/50 border border-transparent'}`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 text-slate-400'}`}>
                  <link.icon size={20} />
                </div>
                <span className={`text-lg font-black uppercase tracking-widest ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
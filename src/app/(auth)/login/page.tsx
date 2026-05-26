"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, User, Loader2, Eye, EyeOff, Fingerprint, ShieldCheck, Lock } from 'lucide-react';

// ✅ کلاینت اختصاصی و استاندارد پروژه شما که کوکی‌ها را تنظیم می‌کند
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  // ✅ مقداردهی سوپابیس باید داخل کامپوننت باشد تا در سمت کلاینت به درستی کار کند
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingAvatar, setFetchingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [displayName, setDisplayName] = useState(''); 
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  // 🔄 بررسی خودکار: اگر کاربر از قبل لاگین بود، مستقیم به داشبورد برود
  useEffect(() => {
    const checkActiveSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkActiveSession();
  }, [router, supabase.auth]);

  // 📸 واکشی آنی عکس، نام و تخلص به محض تکمیل ساختار ایمیل از دیتابیس
  useEffect(() => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setAvatarUrl('');
      setDisplayName('');
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        setFetchingAvatar(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (!error && data) {
          if (data.avatar_url) setAvatarUrl(data.avatar_url);
          if (data.first_name || data.last_name) {
            setDisplayName(`${data.first_name} ${data.last_name}`.trim());
          }
        } else {
          setAvatarUrl('');
          setDisplayName('');
        }
      } catch (err) {
        console.error("Live profile query failed:", err);
      } finally {
        setFetchingAvatar(false);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [email, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ 
      email: email.trim().toLowerCase(), 
      password 
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      {/* ─── Background 3D Glow Orbs ─── */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-multiply pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10 flex flex-col items-center pt-8">
        
        {/* ─── Header & Logo ─── */}
        <div className="text-center mb-10 relative flex flex-col items-center">
          
          <div className="mb-4 relative w-20 h-20 mix-blend-multiply drop-shadow-md">
            <Image 
              src="/logo.png" 
              alt="Sultan Online Service Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
            <ShieldCheck size={14} /> Secured Gateway
          </div>
          
          <div className="inline-block select-none">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Sultan <span className="text-blue-600">Online</span> Service
            </h1>
          </div>
          <p className="text-slate-400 mt-2 font-bold text-[10px] uppercase tracking-[0.3em]">
            Premium SMM & Digital Infrastructure
          </p>
        </div>

        {/* ─── Main Login Card ─── */}
        <div className="w-full bg-white/90 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(30,41,59,0.08)] border border-white relative mt-6">
          
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-3xl p-1.5 border border-slate-100 shadow-xl shadow-blue-900/5 flex items-center justify-center z-20 transition-transform duration-500 hover:scale-105">
            <div className="w-full h-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative shadow-inner">
              {fetchingAvatar ? (
                <Loader2 className="animate-spin text-blue-600" size={24} />
              ) : avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover animate-in zoom-in-50 duration-500"
                />
              ) : (
                <User className="text-slate-300 animate-in fade-in" size={28} />
              )}
            </div>
          </div>

          <div className="text-center mb-8 pt-6 space-y-1.5">
            {displayName ? (
              <h2 className="text-lg font-black text-blue-600 uppercase tracking-tight animate-in fade-in slide-in-from-top-4 duration-500 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                {displayName}
              </h2>
            ) : (
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Welcome Back</h2>
            )}
            <p className="text-slate-400 text-xs font-medium">Enter credentials to access your terminal.</p>
          </div>

          {errorMsg && (
            <div className="p-4 mb-6 bg-rose-50 border border-rose-100/50 rounded-2xl text-rose-600 font-semibold text-xs animate-in shake duration-300 flex items-center gap-3">
              <div className="p-1.5 bg-rose-100 rounded-lg shrink-0"><Lock size={14} /></div>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            <div className="space-y-2 group/input">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/input:text-blue-600 transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" required placeholder="name@domain.com" value={email}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-semibold text-sm text-slate-800 placeholder:text-slate-300"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 group/input">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-focus-within/input:text-blue-600 transition-colors">Security Key</label>
                <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} required placeholder="••••••••" value={password}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-black text-lg text-slate-800 tracking-widest placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-bold placeholder:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm border border-slate-100 transition-all"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full relative overflow-hidden group/btn bg-blue-600 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_10px_20px_rgba(37,99,235,0.15)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
              
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-white relative z-10" size={18} />
                  <span className="relative z-10">Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Initialize Session</span>
                  <ArrowRight size={18} className="text-white group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-semibold">
              New to the system? 
              <Link href="/signup" className="text-blue-600 font-black hover:text-blue-700 transition-colors inline-flex items-center gap-1 mt-2 uppercase tracking-widest text-[10px] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 ml-2">
                Create Account <ArrowRight size={10}/>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
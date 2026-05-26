"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, ArrowLeft, Info, RefreshCw, ShieldCheck, QrCode, ScanLine, ArrowRight, Loader2 } from 'lucide-react';

function AtomaPayContent() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // خواندن اطلاعات کامل از لینک (URL)
  const amountToPay = searchParams.get('amount') || '0';
  const serviceName = searchParams.get('serviceName') || 'شارژ حساب';
  const serviceId = searchParams.get('serviceId') || '';
  const quantity = searchParams.get('quantity') || '0';
  const link = searchParams.get('link') || '';

  // تبدیل مبلغ به عدد برای محاسبه
  const amountUSD = parseFloat(amountToPay);
  
  // نرخ ارز روز (دلار به افغانی)
  const exchangeRate = 85; 
  const amountAFN = (amountUSD * exchangeRate).toLocaleString();

  const [referenceId, setReferenceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userId, setUserId] = useState<string | null>(null);

  const phoneNumber = "+93776425811";

  // دریافت آیدی کاربر
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    }
    getUser();
  }, [supabase]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    alert("شماره اتوما پی کپی شد!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceId) {
      setMessage({ type: 'error', text: 'لطفاً کد پیگیری اتوما پی را وارد کنید.' });
      return;
    }
    if (!userId) {
      setMessage({ type: 'error', text: 'شما وارد حساب کاربری نشده‌اید.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // ارسال اطلاعات به API بک‌اندی که برای اتوما پی ساختیم
      const response = await fetch(`/api/checkout/atomapay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          serviceId: serviceId,
          serviceName: serviceName,
          quantity: quantity,
          link: link,
          amount: amountToPay,
          transactionInfo: referenceId
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'خطا در ارتباط با سرور');
      }

      setMessage({ type: 'success', text: 'رسید شما با موفقیت ثبت شد و پیام به مدیریت ارسال گردید!' });
      setReferenceId('');
      
      // هدایت به داشبورد بعد از ۳ ثانیه
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

    } catch (err: any) {
      setMessage({ type: 'error', text: 'خطا در ثبت تراکنش: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans overflow-x-hidden">
      
      {/* ─── Animated Premium Background ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-400/20 via-sky-300/10 to-indigo-500/20 blur-[120px] rounded-full animate-[pulse_6s_ease-in-out_infinite] pointer-events-none -z-10" />

      {/* ─── Main Glassmorphism Card ─── */}
      <div 
        className={`relative max-w-5xl w-full bg-white/80 backdrop-blur-3xl rounded-[3rem] p-6 sm:p-12 border border-blue-100 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] transition-all duration-700 ease-out transform ${isHovered ? 'scale-[1.01] -translate-y-2 border-blue-200 shadow-[0_30px_70px_-15px_rgba(37,99,235,0.15)]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Premium Blue Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 opacity-90 shadow-[0_0_20px_rgba(37,99,235,0.4)] rounded-t-[3rem]" />

        {/* ─── Header ─── */}
        <div className="text-center border-b border-slate-100 pb-8 relative animate-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-2xl mb-4 shadow-[0_0_30px_rgba(37,99,235,0.2)] border border-blue-100 transform hover:rotate-6 hover:scale-110 transition-all duration-300">
            <ShieldCheck className="text-blue-600" size={36} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 italic tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-sm">ATOMA</span> PAY SECURE
          </h1>
          <p className="text-slate-400 text-[10px] md:text-xs font-black mt-3 uppercase tracking-[0.4em]">
            Encrypted Manual Transaction Gateway
          </p>
        </div>

        {/* ─── Payment Roadmap (Stepped Progress) ─── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 animate-in fade-in duration-1000">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center border border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <span className="font-black">1</span>
            </div>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest text-center">Scan & Pay</span>
          </div>
          <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-blue-600 to-slate-200"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-200">
              <span className="font-black">2</span>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Submit Receipt</span>
          </div>
          <div className="hidden md:block w-16 h-0.5 bg-slate-200"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-200">
              <span className="font-black">3</span>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Service Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start mt-4">
          
          {/* ─── Left Column: QR & Financial Info ─── */}
          <div className="md:col-span-2 space-y-6 flex flex-col animate-in slide-in-from-left-8 duration-700">
            
            {/* Advanced QR Scanner Box */}
            <div className="relative group perspective-[1000px] mx-auto w-full max-w-[280px]">
              <div className="relative aspect-square w-full bg-white rounded-[2.5rem] overflow-hidden border-2 border-blue-200 p-4 shadow-[0_15px_40px_-10px_rgba(37,99,235,0.15)] transition-all duration-700 transform-style-3d group-hover:rotate-y-12 group-hover:shadow-[0_20px_50px_-5px_rgba(37,99,235,0.25)]">
                {/* Laser Scanner Effect */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500 shadow-[0_0_20px_5px_rgba(37,99,235,0.4)] z-20 animate-[bounce_2.5s_infinite]" />
                <Image 
                  src="/atoma.jpg" 
                  alt="Atoma Pay QR Code" 
                  fill 
                  className="object-cover p-2 relative z-10 rounded-[2rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none" />
              </div>
              
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-[0_10px_20px_rgba(37,99,235,0.3)] border border-blue-400/50">
                <ScanLine size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scan to Pay</span>
              </div>
            </div>

            {/* Premium Official Account Box */}
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 text-slate-800 p-6 rounded-[2rem] text-center shadow-lg relative overflow-hidden group mt-4">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-400/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
              <p className="text-[9px] text-blue-600/70 font-black uppercase tracking-[0.25em] mb-2 relative z-10">
                Official Atoma Account / حساب رسمی اتوما
              </p>
              <div className="flex items-center justify-center gap-3 relative z-10" dir="ltr">
                <p className="text-2xl md:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700 tracking-widest">
                  {phoneNumber}
                </p>
              </div>
              <button 
                onClick={copyToClipboard}
                className="mt-4 bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 hover:border-blue-300 transition-all active:scale-95 shadow-sm"
              >
                Copy Number
              </button>
            </div>

            {/* Currency Conversion Display */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-[2rem] shadow-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total USD</p>
                <p className="text-2xl font-black text-slate-800">${amountUSD.toFixed(2)}</p>
              </div>
              <div className="bg-blue-50/80 border border-blue-100 p-5 rounded-[2rem] shadow-[inset_0_0_20px_rgba(37,99,235,0.03)]">
                <p className="text-[9px] font-black text-blue-600/80 uppercase tracking-widest mb-1">مبلغ به افغانی</p>
                <p className="text-xl font-black text-blue-700 mt-1">{amountAFN} <span className="text-[10px] text-blue-500">AFN</span></p>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Instructions, Alerts & Form ─── */}
          <div className="md:col-span-3 space-y-5 animate-in slide-in-from-right-8 duration-700 delay-100">
            
            {/* Persian Instruction Box */}
            <div className="bg-white border border-blue-100 p-6 sm:p-8 rounded-[2rem] text-right space-y-4 shadow-lg shadow-blue-900/5" dir="rtl">
              <div className="flex items-center gap-3 text-slate-800 font-black mb-2">
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                  <CheckCircle2 size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl">سفارش شما در سیستم ثبت شد!</h3>
              </div>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                جهت نهایی‌سازی و اجرای سرویس <strong className="text-blue-600">({serviceName})</strong>، لطفاً مبلغ را از طریق اسکن <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">کد QR</span> یا واریز مستقیم به <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">شماره حساب اتوما پی</span> پرداخت نمایید. پس از واریز، کد پیگیری تراکنش خود را در فرم پایین وارد کنید.
              </p>
            </div>

            {/* English Instruction Box */}
            <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-[2rem] text-left space-y-4 shadow-sm" dir="ltr">
              <div className="flex items-center gap-3 text-slate-800 font-black mb-2">
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <QrCode size={24} className="text-blue-500" />
                </div>
                <h3 className="text-xl">Awaiting Payment Confirmation</h3>
              </div>
              <p className="text-sm text-slate-500 leading-loose font-medium">
                Please complete your payment of <strong className="text-slate-800">${amountUSD}</strong> using the provided QR Code or Atoma Pay Number. Once transferred, kindly submit your Transaction ID below for immediate order execution.
              </p>
            </div>

            {/* Ultra-Luxury Warning Box */}
            <div className="bg-gradient-to-r from-sky-50 to-transparent border border-sky-200 p-6 rounded-[2rem] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-start gap-4 text-right relative z-10" dir="rtl">
                <div className="p-2.5 bg-sky-100 border border-sky-200 rounded-xl text-sky-600 mt-1 shadow-inner shrink-0 animate-pulse">
                  <Info size={22} />
                </div>
                <div className="text-xs font-bold text-slate-600 leading-loose">
                  <span className="font-black block mb-1.5 text-sm text-sky-700">نکته امنیتی بسیار مهم:</span>
                  لطفاً در قسمت <span className="text-sky-700 bg-sky-100 px-2 py-0.5 rounded border border-sky-200 font-black mx-1">Memo / یادداشت</span> در اپلیکیشن اتوما پی، حتماً نام سرویس انتخابی خود را بنویسید تا تراکنش شما سریع‌تر تایید شود.
                </div>
              </div>
            </div>

            {/* ─── فرم ثبت کد پیگیری (متصل به بک‌اند) ─── */}
            <div className="bg-white border border-blue-100 p-6 sm:p-8 rounded-[2rem] shadow-lg shadow-blue-900/5 mt-6">
              <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
                <div>
                  <label className="block mb-3 text-sm font-black text-slate-600 uppercase tracking-widest text-right">
                    کد پیگیری اتوما پی (Transaction ID):
                  </label>
                  <input 
                    type="text" 
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    placeholder="کد پیگیری تراکنش را وارد کنید..." 
                    className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-slate-800 transition-all text-left text-lg placeholder:text-slate-400"
                    dir="ltr"
                    required
                  />
                </div>

                {message.text && (
                  <div className={`p-4 rounded-xl text-sm font-bold text-center ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {message.text}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={() => router.back()}
                    className="order-2 sm:order-1 text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:text-blue-600 transition-colors py-4 px-6 rounded-2xl hover:bg-blue-50 border border-transparent hover:border-blue-100"
                  >
                    <ArrowLeft size={16} /> Edit Order
                  </button>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="relative order-1 sm:order-2 flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest transition-all duration-500 shadow-[0_15px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 overflow-hidden group"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative z-10 flex items-center gap-3 drop-shadow-sm">
                      {loading ? <Loader2 className="animate-spin" size={24} /> : (
                        <>تایید و ارسال رسید <ArrowRight size={20} className="rotate-180" /></>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// برای جلوگیری از ارور بیلد Next.js
export default function AtomaPayPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="p-6 bg-white rounded-3xl shadow-xl mb-4 relative border border-slate-200">
          <div className="absolute inset-0 rounded-3xl border-2 border-blue-500 animate-ping opacity-20" />
          <RefreshCw className="animate-spin text-blue-600" size={40} />
        </div>
        <p className="font-black italic text-slate-400 uppercase tracking-[0.4em] text-[10px]">Initializing Secure Gateway...</p>
      </div>
    }>
      <AtomaPayContent />
    </Suspense>
  );
}
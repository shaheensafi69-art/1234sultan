"use client";
import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, ArrowLeft, Info, RefreshCw, Send, ShieldCheck, QrCode, ScanLine, ArrowRight } from 'lucide-react';

function ConfirmPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  const amountUSD = parseFloat(searchParams.get('amount') || "0");
  const serviceName = searchParams.get('serviceName') || 'Premium Service';
  
  // نرخ ارز روز (دلار به افغانی)
  const exchangeRate = 85; 
  const amountAFN = (amountUSD * exchangeRate).toLocaleString();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans overflow-hidden">
      
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-sm">HESAB</span>PAY SECURE
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
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Upload Receipt</span>
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
                  src="/hesabpay.jpg" 
                  alt="HesabPay QR Code" 
                  fill 
                  className="object-contain p-2 relative z-10"
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
                Official Account / شماره حساب رسمی
              </p>
              <div className="flex items-center justify-center gap-3 relative z-10">
                <p className="text-2xl md:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700 tracking-widest">
                  +93747991384
                </p>
              </div>
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

          {/* ─── Right Column: Instructions & Alerts ─── */}
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
                جهت نهایی‌سازی و اجرای سرویس <strong className="text-blue-600">({serviceName})</strong>، لطفاً مبلغ را از طریق اسکن <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">کد QR</span> یا واریز مستقیم به <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">شماره حساب</span> پرداخت نمایید. پس از واریز، رسید خود را جهت تایید آنی به <span className="font-black text-blue-600 border-b border-blue-300 pb-0.5 hover:text-blue-500 cursor-pointer transition-colors">پشتیبانی واتساپ</span> ارسال کنید.
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
                Please complete your payment of <strong className="text-slate-800">${amountUSD}</strong> using the provided QR Code or Phone Number. Once transferred, kindly share your receipt with our <span className="font-black text-blue-500 cursor-pointer hover:text-blue-600 transition-colors">WhatsApp Team</span> for immediate order execution.
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
                  لطفاً در قسمت <span className="text-sky-700 bg-sky-100 px-2 py-0.5 rounded border border-sky-200 font-black mx-1">Memo / یادداشت</span> در اپلیکیشن حساب‌پی، حتماً نام سرویس انتخابی خود را بنویسید تا تراکنش شما سریع‌تر تایید شود.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── Control Buttons with Advanced Hover States ─── */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-5 items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="order-2 sm:order-1 text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 hover:text-blue-600 transition-colors py-3 px-5 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100"
          >
            <ArrowLeft size={16} /> Edit Order
          </button>

          <button 
            onClick={() => router.push('/dashboard/orders')}
            className="relative order-1 sm:order-2 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-12 py-5 rounded-2xl font-black text-sm sm:text-base uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_15px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] active:scale-95 flex items-center justify-center gap-3 group overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-3 drop-shadow-sm">
              I Have Paid / پرداخت کردم 
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function ConfirmPaymentPage() {
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
      <ConfirmPaymentContent />
    </Suspense>
  );
}
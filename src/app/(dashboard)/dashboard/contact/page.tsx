"use client";
import React, { useState } from 'react';
import { PhoneCall, Headset, MessageCircle, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const phoneNumber = "93783738814"; 
  const facebookLink = "https://www.facebook.com/share/1F1NJPStmY/?mibextid=wwXIfr";
  const instagramLink = "https://www.instagram.com/sultan_online_services?igsh=eXd1cHlsdnlmZm84&utm_source=qr";
  const tiktokLink = "https://www.tiktok.com/@sultan_tech.799?_r=1&_t=ZG-96hXOWF2yWG";

  // استیت برای باز و بسته شدن کشوی راهنما
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 font-sans animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden bg-slate-50">
      
      {/* ─── پس‌زمینه مدرن ─── */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl w-full space-y-12 relative z-10 pt-8 pb-20">
        
        {/* ─── هدر صفحه ─── */}
        <div className="text-center space-y-4 relative">
          <div className="inline-flex items-center gap-2 bg-white backdrop-blur-md border border-slate-200 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2 shadow-sm">
            <Headset size={14} /> Sultan Support Team
          </div>
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter drop-shadow-sm text-slate-900">
            SUPPORT <span className="text-blue-600">CENTER</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Connect directly with our elite support architects. We are on standby to ensure your digital infrastructure scales flawlessly.
          </p>
        </div>

        {/* ─── راهنمای کشویی (Accordion) برای ارسال رسید ─── */}
        <div className="max-w-2xl mx-auto w-full mt-8">
          <button 
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className="w-full flex items-center justify-between bg-white p-6 rounded-2xl border border-blue-100 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.15)] hover:shadow-[0_15px_40px_-15px_rgba(37,99,235,0.2)] transition-all duration-300"
            dir="ltr"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <MessageCircle size={20} />
              </div>
              <span className="font-black text-slate-800 text-base sm:text-lg tracking-tight">How to submit payment receipts?</span>
            </div>
            <ChevronDown className={`text-blue-600 transition-transform duration-300 ${isGuideOpen ? 'rotate-180' : ''}`} size={24} />
          </button>

          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isGuideOpen ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
          >
            <div className="bg-blue-50/80 border border-blue-100 p-6 rounded-2xl text-right shadow-inner" dir="rtl">
              <p className="text-sm font-bold text-slate-700 leading-loose">
                برای تایید سفارشات، لطفاً اسکرین‌شات رسید پرداختی خود (از <span className="text-blue-600 font-black px-1">حساب‌پی</span> یا <span className="text-blue-600 font-black px-1">اتوما پی</span>) را مستقیماً به شماره واتس‌اپ پشتیبانی ما ارسال کنید تا در سریع‌ترین زمان ممکن بررسی شود.
              </p>
            </div>
          </div>
        </div>

        {/* ─── گرید شبکه‌های اجتماعی ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto w-full justify-center pt-4">
          
          {/* WhatsApp */}
          <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="32" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.7c-33.1 0-65.5-8.9-94-25.8l-6.7-4-69.8 18.3L72 334.4l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.9 82.9-184.8 184.8-184.8 49.3 0 95.8 19.2 130.7 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6.4-5.3 3.1-8.1 2.5-2.5 5.5-6.4 8.3-9.6 2.7-3.2 3.7-5.5 5.5-9.2 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase">WhatsApp</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Direct Chat</p>
            </div>
          </a>

          {/* Facebook */}
          <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="32" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase">Facebook</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Sultan Network</p>
            </div>
          </a>

          {/* Instagram */}
          <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:text-white transition-colors">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="32" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase">Instagram</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">@sultan_online_services</p>
            </div>
          </a>

          {/* TikTok */}
          <a href={tiktokLink} target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="32" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase">TikTok</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">@sultan_tech.799</p>
            </div>
          </a>

        </div>

        {/* ─── کارت تماس مستقیم (وسط پایین) ─── */}
        <div className="flex justify-center pt-4">
          <a href={`tel:+${phoneNumber}`} className="w-full sm:w-auto min-w-[280px] group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors">
              <PhoneCall size={32} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase">Direct Call</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Hotline Support</p>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
}
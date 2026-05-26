"use client";
import React from 'react';
import Link from 'next/link';
import { FileText, Scale, CreditCard, AlertCircle, ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* هدر صفحه */}
      <div className="bg-slate-900 text-white pt-24 pb-16 px-6 relative overflow-hidden">
        {/* بک‌گراند نوری ملایم */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Terms of <span className="text-blue-500 italic">Service</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm md:text-base max-w-2xl leading-relaxed">
            By accessing or using Sultan Online Service LTD services, you agree to be bound by these terms. Please read them carefully before placing an order.
          </p>
          <p className="text-blue-500/70 font-bold text-xs tracking-widest uppercase mt-6">
            Last Updated: May 2026
          </p>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12 space-y-12">
          
          <section className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0 pt-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <FileText size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">1. General Conditions</h2>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                Sultan Online Service LTD is a digital service platform owned and operated by Safi International Capital LTD. By placing an order with us, you automatically accept all the below-listed terms of service whether you read them or not. We reserve the right to change these terms of service without notice.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0 pt-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Scale size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">2. Service Usage & Delivery</h2>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                You will only use our website to promote your social media accounts and help boost your appearance. We do not guarantee a delivery time for any services. We offer our best estimation for when the order will be delivered. This is only an estimation and we will not refund orders that are processing if you feel they are taking too long.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0 pt-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <CreditCard size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">3. Payments & Refunds</h2>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                No refunds will be made to your payment method once a deposit has been completed. Orders placed cannot be canceled or refunded once they have been successfully submitted to the system. Misplaced or private account orders will not qualify for a refund.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0 pt-1">
              {/* برای بخش هشدار، رنگ قرمز ملایم حفظ شده است تا کاربر متوجه اهمیت آن بشود */}
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                <AlertCircle size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">4. Liabilities & Account Suspension</h2>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                Sultan Online Service LTD is in no way liable for any account suspension or picture deletion done by Instagram, Twitter, Facebook, YouTube, or Other Social Media platforms. Fraudulent activity such as using unauthorized or stolen credit cards will lead to termination of your account.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
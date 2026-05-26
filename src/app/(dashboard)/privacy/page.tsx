"use client";
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Database, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* هدر صفحه */}
      <div className="bg-slate-900 text-white pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Privacy <span className="text-blue-500 italic">Policy</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm md:text-base max-w-2xl leading-relaxed">
            At Sultan Online Service, managed by Sultan Online Service LTD, your privacy is our priority. This document outlines how we collect, use, and protect your personal information.
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
                <Database size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">1. Information We Collect</h2>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us. This information may include your name, email address, payment details, and social media handles required for service delivery.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0 pt-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Eye size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">2. How We Use Information</h2>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                We use the information we collect to provide, maintain, and improve our services. This includes processing transactions, sending technical notices, updates, security alerts, and support messages. We do not sell your personal data to third parties.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0 pt-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Lock size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">3. Data Security</h2>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                We implement highly secure protocols to protect your personal information. Payment processing is handled by industry-leading providers (like Stripe and NowPayments), and we do not store your sensitive credit card information on our servers.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0 pt-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-slate-900">4. Your Rights</h2>
              <p className="text-sm text-slate-600 leading-loose font-medium">
                You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact our support team. We will process your request in accordance with applicable UK and international privacy laws.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
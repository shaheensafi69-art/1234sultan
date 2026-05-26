"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Network, Globe, ArrowLeft, Building, 
  Workflow, ShieldCheck, Handshake, Compass, LineChart
} from 'lucide-react';

export default function SahelProfilePage() {
  const coreCompetencies = [
    "Ecosystem Scalability", "Global B2B Relations", "Operations Management", 
    "Strategic Partnerships", "Risk Mitigation", "Cross-Border Infrastructure", 
    "Service Reliability Architecture"
  ];

  const milestones = [
    {
      icon: <Building size={20} />,
      year: "Present",
      title: "Director & Ecosystem Leader",
      org: "Sultan Online Service",
      desc: "Directing the overarching operational strategy and managing the intricate network of global API providers and enterprise client relations."
    },
    {
      icon: <Globe size={20} />,
      year: "Strategic Operations",
      title: "Head of European & Global Relations",
      org: "Safi International Ecosystem",
      desc: "Bridging the gap between robust digital platforms and international financial standards, ensuring seamless cross-border operational compliance."
    },
    {
      icon: <Workflow size={20} />,
      year: "Infrastructure",
      title: "B2B Network Architect",
      org: "Digital Supply Chain",
      desc: "Designed and scaled automated service delivery pipelines, resulting in 99.9% uptime and lightning-fast global order fulfillment."
    },
    {
      icon: <LineChart size={20} />,
      year: "Growth",
      title: "Market Expansion Specialist",
      org: "Enterprise Scale",
      desc: "Spearheaded the integration of premium digital tools and AI services into the core platform, exponentially increasing global market reach."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-4 sm:px-6 font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* ─── دکمه بازگشت ─── */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/about" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Leadership
          </Link>
        </motion.div>

        {/* ─── هدر پروفایل ─── */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
            {/* تصویر */}
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-[2rem] -rotate-6 opacity-20"></div>
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                <Image src="/sahel.jpeg" alt="Sahel Salem" fill className="object-cover" priority />
              </div>
            </div>

            {/* مشخصات اصلی */}
            <div className="flex-1 text-center md:text-left space-y-5">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-md">
                <Network size={14} className="text-blue-400" /> Operational Mastery
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tight">Sahel Salem</h1>
                <p className="text-blue-600 font-black text-lg uppercase tracking-widest mt-2">Director & Ecosystem Leader</p>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                The strategic architect of our operational ecosystem. As Director, he meticulously designs and manages the intricate network of B2B providers, global APIs, and enterprise client relations. His leadership ensures that every transaction and service delivery operates with flawless speed, peak efficiency, and unwavering reliability.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── مهارت‌های استراتژیک ─── */}
        <section className="space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Core Competencies</h2>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {coreCompetencies.map((skill, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-xs font-black text-slate-700 uppercase shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all cursor-default"
              >
                <Compass size={16} /> {skill}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── سوابق و نقاط عطف (Timeline) ─── */}
        <section className="space-y-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Professional Milestones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">{item.year}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase italic">{item.title}</h3>
                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1 mb-3">{item.org}</p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── فلسفه کاری ─── */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[3rem] p-12 text-center text-white space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Handshake size={40} className="text-blue-400 mx-auto" />
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">
              "An ecosystem is only as strong as its connections."
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              True digital dominance requires more than just powerful servers; it requires flawless synchronization between people, providers, and platforms. My primary objective is to build and maintain operational bridges that never collapse, ensuring our clients experience nothing but excellence.
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
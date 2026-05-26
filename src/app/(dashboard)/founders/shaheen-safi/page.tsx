"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Code2, Database, Terminal, Cpu, Globe, 
  GraduationCap, Award, Briefcase, Server, ArrowLeft 
} from 'lucide-react';

export default function ShaheenProfilePage() {
  const techStack = [
    "Next.js & React", "TypeScript", "Supabase", 
    "Flutter & Dart", "NowPayments API", "Stripe API", 
    "Algorithmic Trading (ICT/CRT)"
  ];

  const milestones = [
    {
      icon: <Briefcase size={20} />,
      year: "Present",
      title: "Developer Team Leader",
      org: "Sultan Online Service",
      desc: "Architecting the core digital infrastructure, API integrations, and secure payment gateways for a global digital ecosystem."
    },
    {
      icon: <Globe size={20} />,
      year: "Fintech Ventures",
      title: "Founder & Architect",
      org: "SafiPay, Safi TopUp & SafiPro",
      desc: "Developed and launched multi-currency digital banking platforms, mobile airtime services, and modern e-commerce ecosystems."
    },
    {
      icon: <Award size={20} />,
      year: "Dec 2024",
      title: "Certified Financial Technician (CFTe)",
      org: "International Federation of Technical Analysts (IFTA)",
      desc: "Mastery in advanced algorithmic trading strategies, including ICT and Central Range Theory (CRT)."
    },
    {
      icon: <GraduationCap size={20} />,
      year: "2018 - 2022",
      title: "B.Sc. in Computer Science",
      org: "Istanbul Technical University",
      desc: "Deep foundation in software engineering, complex data structures, and algorithmic logic."
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
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[2rem] rotate-6 opacity-20"></div>
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                <Image src="/shaheen.jpeg" alt="Shaheen Safi" fill className="object-cover" priority />
              </div>
            </div>

            {/* مشخصات اصلی */}
            <div className="flex-1 text-center md:text-left space-y-5">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-md">
                <Terminal size={14} className="text-blue-400" /> Based in Istanbul Turkey
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tight">Shaheen Safi</h1>
                <p className="text-blue-600 font-black text-lg uppercase tracking-widest mt-2">Developer Team Leader</p>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                The technical mastermind driving the digital infrastructure at Sultan Online Service. With a profound background in computer science and global fintech architecture, Shaheen transforms visionary concepts into secure, highly scalable, and automated digital ecosystems.
              </p>
              
              {/* لینک به وبلاگ شخصی */}
              <div className="pt-2">
                <a 
                  href="https://www.shaheensafi.blog" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-black text-xs uppercase tracking-widest transition-colors"
                >
                  <Globe size={16} /> Visit Personal Space
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── مهارت‌های فنی و استک ─── */}
        <section className="space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Technical Arsenal</h2>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {techStack.map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-xs font-black text-slate-700 uppercase shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all cursor-default"
              >
                <Code2 size={16} /> {tech}
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
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Server size={40} className="text-blue-400 mx-auto" />
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">
              "Code is the absolute truth in a world of variables."
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              At Sultan Online Service, we don't just write scripts; we engineer high-performance, fault-tolerant ecosystems. My mission is to ensure that every layer of our digital infrastructure operates with absolute precision, uncompromised security, and infinite scalability.
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
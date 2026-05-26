"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Terminal, Globe, GraduationCap, Award, Server, ArrowLeft, 
  MapPin, Youtube, Smartphone, PlaySquare, TrendingUp, Code2
} from 'lucide-react';

export default function SultanProfilePage() {
  const techStack = [
    "YouTube Monetization", "Meta & Facebook Algorithms", "TikTok Growth Systems", 
    "Information Technology", "Digital Marketing", "Social Media Analytics", 
    "Internet Ecosystems"
  ];

  const milestones = [
    {
      icon: <Award size={20} />,
      year: "Present",
      title: "The Digital Mastermind (Sultan)",
      org: "Social Media Monetization",
      desc: "Successfully monetized dozens of YouTube channels. A true master of TikTok, Facebook, and complex internet algorithms. If it exists online, he knows how its system works."
    },
    {
      icon: <GraduationCap size={20} />,
      year: "Graduated",
      title: "B.Sc. in Computer Science",
      org: "Information Technology (IT) Department",
      desc: "Deep foundation in networking, digital infrastructure, and computer systems that powers his advanced understanding of the internet."
    },
    {
      icon: <GraduationCap size={20} />,
      year: "1396",
      title: "High School Diploma",
      org: "Safiullah Afzali High School",
      desc: "Completed early education with a strong passion for technology, paving the way for a dominant career in the digital world."
    },
    {
      icon: <MapPin size={20} />,
      year: "2000/04/05",
      title: "Birth & Origin",
      org: "Jawzjan Province",
      desc: "Born and raised in Jawzjan, bringing a relentless drive, ambition, and vision to conquer the global digital landscape."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-4 sm:px-6 font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* ─── Back Button ─── */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/about" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Leadership
          </Link>
        </motion.div>

        {/* ─── Profile Header ─── */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
            {/* Image */}
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[2rem] rotate-6 opacity-20"></div>
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                <Image src="/sultan.jpeg" alt="Mudassir Moradi (Sultan)" fill className="object-cover" priority />
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center md:text-left space-y-5">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-md">
                <MapPin size={14} className="text-blue-400" /> From Jawzjan Province
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tight">Mudassir Moradi</h1>
                <p className="text-blue-600 font-black text-lg uppercase tracking-widest mt-2">Known as "Sultan"</p>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                An Information Technology graduate and an absolute powerhouse in the digital realm. Sultan has cracked the code to internet algorithms, successfully monetizing dozens of YouTube channels. From TikTok to Facebook, if it exists on the internet, Sultan knows the system.
              </p>
              
              {/* Social/Status Badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                  <TrendingUp size={16} /> Chief of IT & Social Media Monetization
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── Technical Stack & Skills ─── */}
        <section className="space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Digital Arsenal</h2>
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

        {/* ─── Milestones (Timeline) ─── */}
        <section className="space-y-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Life & Achievements</h2>
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

        {/* ─── Work Philosophy ─── */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[3rem] p-12 text-center text-white space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Globe size={40} className="text-blue-400 mx-auto" />
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">
              "Algorithms rule the internet, and I rule the algorithms."
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              At Sultan Online Service, we don't just participate in the digital world; we dominate it. My mission is to decode the complexities of global social media platforms—from YouTube to TikTok—ensuring maximum reach, flawless monetization, and absolute digital authority.
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
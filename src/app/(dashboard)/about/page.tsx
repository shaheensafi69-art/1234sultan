"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Target, Rocket, Bot, Globe2, 
  Network, Zap, BrainCircuit, BarChart3, Lock, CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: "Mudassir Moradi",
      role: "Founder & CEO",
      image: "/sultan.jpeg",
      href: "/founders/sultan",
      bio: "The visionary architect behind Sultan Online Service. Mudassir leads our global expansion strategies, bridging the gap between local talent and international digital markets. His leadership ensures our infrastructure remains at the absolute pinnacle of the Social Media Marketing industry.",
      skills: ["Global Strategy", "Market Architecture", "Enterprise Vision"]
    },
    {
      name: "Sahel Salem",
      role: "Director & Ecosystem Leader",
      image: "/sahel.jpeg",
      href: "/founders/sahel-salem",
      bio: "The master of our operational ecosystem. Sahel meticulously designs and manages the intricate network of APIs, provider connections, and client relations. He ensures that every transaction and service delivery operates with flawless speed, peak efficiency, and unwavering reliability.",
      skills: ["Ecosystem Scalability", "Operations Mastery", "Global Relations"]
    },
    {
      name: "Shaheen Safi",
      role: "Developer Team Leader",
      image: "/shaheen.jpeg",
      href: "/founders/shaheen-safi",
      bio: "The technical mastermind driving our digital innovation. Shaheen commands the engineering division, building secure, high-performance proprietary tech stacks. From complex automated systems to seamless UI/UX, he translates visionary concepts into robust, scalable digital realities.",
      skills: ["Full-Stack Innovation", "Security Engineering", "System Automation"]
    }
  ];

  const services = [
    {
      icon: <Target size={32}/>,
      title: "Global Social Promotion",
      desc: "Dominating the digital landscape requires algorithmic mastery. We provide ultra-targeted, high-retention engagement campaigns across all major platforms (Instagram, TikTok, YouTube, X) to trigger viral algorithms and scale your brand's global footprint."
    },
    {
      icon: <Rocket size={32}/>,
      title: "Platform Monetization",
      desc: "We turn your digital presence into a sustainable revenue stream. Our experts navigate the complex monetization policies of YouTube, Facebook, and TikTok, rapidly fulfilling watch-time and follower requirements to activate your earning potential."
    },
    {
      icon: <Bot size={32}/>,
      title: "Artificial Intelligence Solutions",
      desc: "The future is automated. We integrate cutting-edge AI technologies to optimize content generation, analyze predictive audience behaviors, and automate complex digital marketing workflows, giving you an unfair advantage in the modern internet era."
    },
    {
      icon: <Network size={32}/>,
      title: "API & Infrastructure",
      desc: "For resellers and enterprises, we offer robust, high-speed API endpoints. Connect your platform to our central ecosystem and instantly access thousands of premium digital services with zero downtime and automated order fulfillment."
    },
    {
      icon: <BrainCircuit size={32}/>,
      title: "Data-Driven Analytics",
      desc: "Stop guessing. We utilize advanced data scraping and deep analytics to monitor market trends, track competitor strategies, and provide you with actionable intelligence to dominate your specific digital niche."
    },
    {
      icon: <Lock size={32}/>,
      title: "Secure Digital Ecosystem",
      desc: "Security is our foundation. We employ enterprise-grade encryption and decentralized methodologies to ensure that your data, transactions, and digital assets remain completely protected against modern cyber threats."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-4 sm:px-6 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* ─── Header & Global Presence ─── */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          <div className="relative w-48 h-48 mx-auto mb-8 shadow-[0_20px_50px_rgba(37,99,235,0.2)] rounded-[2.5rem] overflow-hidden border-4 border-white bg-white">
            <Image src="/logo.png" alt="Sultan Online Service Logo" fill className="object-contain p-4" priority />
          </div>
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
            <Globe2 size={16} className="text-blue-400" /> Headquartered in Kote Sangi, Kabul, Afghanistan
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter italic uppercase leading-[0.9]">
            Architecting The <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Global Digital</span> Future
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
            The internet has erased physical borders, and we are the bridge connecting local ambition to global dominance. From our headquarters in Kabul, Afghanistan, <strong>Sultan Online Service</strong> powers the digital infrastructure of the modern web. We do not just adapt to the algorithmic changes of the internet; we anticipate them.
          </p>
        </motion.section>

        {/* ─── The AI & Internet Revolution Deep Dive ─── */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-[50%] -right-[10%] w-[80%] h-[200%] bg-gradient-to-b from-blue-600/20 to-transparent rotate-12 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-widest">
                <Zap size={18} /> The Paradigm Shift
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-tight">
                Pioneering the <span className="text-blue-500">AI Revolution</span> & Web 3.0
              </h2>
              <div className="space-y-6 text-slate-300 text-lg font-medium leading-relaxed">
                <p>
                  We are living in the most transformative era of human history. Artificial Intelligence is no longer a futuristic concept—it is the core engine driving global commerce, content creation, and digital networking. 
                </p>
                <p>
                  At Sultan Online, we harness the raw power of machine learning and automated algorithms to revolutionize Social Media Marketing. Whether it is deploying intelligent bots for market research, utilizing generative AI for rapid content scaling, or manipulating complex social algorithms for maximum reach, we provide tools that were once exclusively available to multi-billion-dollar tech giants.
                </p>
                <p>
                  From Kote Sangi to New York, Tokyo, and London, our digital infrastructure empowers creators, businesses, and enterprises to activate monetization across the globe and build empires in the cloud.
                </p>
              </div>
            </div>
            
            {/* Visual Stats / Tech Stack */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="99.9%" label="Uptime Guarantee" />
              <StatCard value="24/7" label="Automated Delivery" />
              <StatCard value="AI" label="Powered Infrastructure" />
              <StatCard value="Global" label="Market Access" />
            </div>
          </div>
        </motion.section>

        {/* ─── Comprehensive Services Grid ─── */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight italic">Our Global Arsenal</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Comprehensive digital solutions designed to elevate your brand's authority, automate your workflows, and maximize your revenue streams.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {srv.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic mb-4">{srv.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Leadership Team (Zigzag Layout) ─── */}
        <section className="space-y-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight italic">The Architects</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mt-3">Leadership driving the digital frontier</p>
          </div>

          <div className="space-y-32">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
              >
                {/* Image Section */}
                <Link href={member.href} className="w-full lg:w-5/12 cursor-pointer group">
                  <div className="relative aspect-square w-full max-w-lg mx-auto">
                    <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
                    <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </Link>

                {/* Content Section */}
                <div className="w-full lg:w-7/12 space-y-6 text-center lg:text-left">
                  <Link href={member.href} className="group block">
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic leading-none group-hover:text-blue-600 transition-colors">{member.name}</h3>
                    <p className="inline-block mt-4 bg-blue-50 text-blue-700 font-black text-sm uppercase tracking-widest px-4 py-1.5 rounded-lg">{member.role}</p>
                  </Link>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                    {member.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="flex items-center gap-1.5 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-black text-slate-700 uppercase shadow-sm hover:border-blue-300 transition-colors">
                        <CheckCircle2 size={14} className="text-blue-500" /> {skill}
                      </span>
                    ))}
                  </div>
                  <div className="pt-6">
                    <Link 
                      href={member.href} 
                      className="inline-flex items-center justify-center bg-slate-900 hover:bg-blue-600 text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95"
                    >
                      Read Full Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// Internal Component for Stats
function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl text-center hover:bg-slate-800 transition-colors">
      <div className="text-3xl font-black text-white italic mb-1">{value}</div>
      <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}
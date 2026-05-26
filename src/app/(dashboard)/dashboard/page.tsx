"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  PlusCircle, Loader2, Zap, Instagram, Music, Facebook, 
  Activity, CheckCircle2, Clock, ArrowUpRight, User, ShieldCheck, Wallet
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ orders: 0, tasks: 0 });
  const [profileData, setProfileData] = useState<any>({ firstName: '', lastName: '', avatarUrl: '', balance: 0 });
  const [liveFollowers, setLiveFollowers] = useState({ insta: 12450, tiktok: 85200, fb: 5320 });

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name, avatar_url, balance')
      .eq('id', user.id)
      .single();

    if (profile) {
      setProfileData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        avatarUrl: profile.avatar_url || '',
        balance: profile.balance || 0
      });
    }

    const { count: ordersCount } = await supabase.from('smm_orders').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
    const { count: pendingCount } = await supabase.from('smm_orders').select('*', { count: 'exact', head: true }).eq('user_id', user.id).in('status', ['pending', 'processing']);

    const { data: latestOrders } = await supabase
      .from('smm_orders')
      .select(`id, created_at, status, total_charge, smm_services (name)`)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    setStats({ orders: ordersCount || 0, tasks: pendingCount || 0 });
    setRecentOrders(latestOrders || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setLiveFollowers(prev => ({
        insta: prev.insta + Math.floor(Math.random() * 5),
        tiktok: prev.tiktok + Math.floor(Math.random() * 12),
        fb: prev.fb + Math.floor(Math.random() * 3),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-600 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-b-2 border-sky-400 animate-spin animate-reverse"></div>
          <ShieldCheck className="absolute inset-0 m-auto text-blue-600" size={40} />
        </div>
        <p className="text-blue-600 font-black tracking-[0.4em] uppercase text-xs animate-pulse">Initializing System...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* ─── Background White/Blue Glows ─── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 relative z-10">
        
        {/* ─── Premium Header: Profile & Wallet (Clean White) ─── */}
        <div className="bg-white p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.05)] overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8 relative">
          
          <div className="flex items-center gap-6 relative z-10 w-full lg:w-auto">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-400 to-sky-300 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-slate-50 overflow-hidden shadow-lg flex items-center justify-center">
                {profileData.avatarUrl ? (
                  <img src={profileData.avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-blue-200" size={36} />
                )}
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 border-[3px] border-white rounded-full"></div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={16} className="text-blue-600" />
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] bg-blue-50 px-2 py-1 rounded-md">Verified Node</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-2">
                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">{profileData.firstName || 'Sultan'}</span>
              </h2>
              <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Secure Connection Active
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
            {/* Wallet Card - Clean Light */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 flex items-center gap-5 w-full sm:w-auto shadow-sm">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                <Wallet size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Available Balance</p>
                <p className="text-3xl font-black text-slate-900 tabular-nums tracking-tighter">
                  $<span className="text-blue-600">{parseFloat(profileData.balance).toFixed(2)}</span>
                </p>
              </div>
            </div>

            {/* Action Button - Blue Gradient */}
            <Link href="/dashboard/new-order" className="w-full sm:w-auto relative overflow-hidden group/btn bg-blue-600 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.3)] hover:bg-blue-700 active:scale-[0.98] flex items-center justify-center gap-3">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
              <PlusCircle size={20} className="group-hover/btn:rotate-90 transition-transform duration-500 text-white" /> 
              <span className="relative z-10">Deploy Order</span>
            </Link>
          </div>
        </div>

        {/* ─── Social Monitoring Nodes (Clean White Cards) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Instagram Node */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-blue-200 transition-all duration-500">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-50 blur-[60px] rounded-full group-hover:bg-blue-100 transition-colors"></div>
            <Instagram className="absolute -right-6 -bottom-6 w-40 h-40 opacity-[0.03] text-slate-900 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-700 shadow-sm">
                  <Instagram size={24} />
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">Live Sync</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Instagram Volume</p>
                <p className="text-5xl font-black tabular-nums tracking-tighter text-slate-900">{liveFollowers.insta.toLocaleString()}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3 flex items-center gap-1">
                  <ArrowUpRight size={14} className="text-blue-500" /> Processing Traffic
                </p>
              </div>
            </div>
          </div>

          {/* TikTok Node */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-sky-200 transition-all duration-500">
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-sky-50 blur-[60px] rounded-full group-hover:bg-sky-100 transition-colors"></div>
            <Music className="absolute -right-6 -bottom-6 w-40 h-40 opacity-[0.03] text-slate-900 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-700 shadow-sm">
                  <Music size={24} />
                </div>
                <div className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-sky-600">Live Sync</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">TikTok Volume</p>
                <p className="text-5xl font-black tabular-nums tracking-tighter text-slate-900">{liveFollowers.tiktok.toLocaleString()}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3 flex items-center gap-1">
                  <ArrowUpRight size={14} className="text-sky-500" /> Processing Traffic
                </p>
              </div>
            </div>
          </div>

          {/* Facebook Node */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-indigo-200 transition-all duration-500">
            <div className="absolute -bottom-20 right-0 w-64 h-64 bg-indigo-50 blur-[60px] rounded-full group-hover:bg-indigo-100 transition-colors"></div>
            <Facebook className="absolute -right-6 -bottom-6 w-40 h-40 opacity-[0.03] text-slate-900 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-700 shadow-sm">
                  <Facebook size={24} />
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Live Sync</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Facebook Volume</p>
                <p className="text-5xl font-black tabular-nums tracking-tighter text-slate-900">{liveFollowers.fb.toLocaleString()}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3 flex items-center gap-1">
                  <ArrowUpRight size={14} className="text-indigo-500" /> Processing Traffic
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Data Terminal & History (Clean UI) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Analysis Terminal */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                   <div className="bg-slate-50 border border-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                     <Activity size={24} />
                   </div>
                   <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-4 py-2 rounded-xl border border-blue-100 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                     Engine Active
                   </span>
                </div>
                
                <div>
                  <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] mb-2">Global Operations</p>
                  <p className="text-7xl font-black text-slate-900 tracking-tighter">{stats.orders}</p>
                </div>
              </div>

              <div className="space-y-4 pt-8 mt-8 border-t border-slate-100 relative z-10">
                <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <div className="p-2 bg-sky-100 rounded-xl text-sky-600"><Clock size={16} /></div>
                    <span>Processing</span>
                  </div>
                  <span className="text-xl font-black text-slate-800 tabular-nums">{stats.tasks}</span>
                </div>

                <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <div className="p-2 bg-blue-100 rounded-xl text-blue-600"><CheckCircle2 size={16} /></div>
                    <span>Completed</span>
                  </div>
                  <span className="text-xl font-black text-slate-800 tabular-nums">{stats.orders - stats.tasks < 0 ? 0 : stats.orders - stats.tasks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Ledger */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-xl text-slate-900 tracking-tight uppercase flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                Ledger Logs
              </h3>
              <Link href="/dashboard/orders" className="text-blue-600 font-black text-[10px] bg-white border border-slate-200 uppercase tracking-[0.2em] hover:bg-blue-50 px-5 py-2.5 rounded-xl transition-all shadow-sm">View Full Log</Link>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-200 group-hover:border-blue-200 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all duration-300">
                            <Zap size={20} className="group-hover:animate-pulse" />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-sm md:text-base uppercase leading-tight line-clamp-1 max-w-[280px] md:max-w-[400px]">
                              {order.smm_services?.name || 'Network Execution Task'}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-[0.2em] flex items-center gap-2">
                              <span>ID: #{order.id}</span>
                              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                              <span>{new Date(order.created_at).toLocaleDateString()}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-slate-900 text-lg tracking-tighter">
                        ${parseFloat(order.total_charge || '0').toFixed(2)}
                      </td>
                    </tr>
                  ))}

                  {recentOrders.length === 0 && (
                    <tr>
                      <td className="py-32 text-center">
                        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <Zap size={32} className="text-slate-300 animate-pulse" />
                        </div>
                        <p className="font-black uppercase tracking-[0.4em] text-[11px] text-slate-400">No Operations Detected</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
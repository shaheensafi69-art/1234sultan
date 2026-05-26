"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { 
  UserPlus, Heart, Eye, MessageSquare, ShieldCheck, 
  LayoutGrid, Loader2, ArrowUpRight, Zap, CheckCircle2, Server, Filter
} from 'lucide-react';

// ۱. فیلترهای دسته‌بندی بر اساس کلمات کلیدی
const SERVICE_TYPES = [
  { id: 'all', name: 'All Services', icon: LayoutGrid },
  { id: 'followers', name: 'Followers / Members', icon: UserPlus },
  { id: 'likes', name: 'Likes / Reactions', icon: Heart },
  { id: 'views', name: 'Views / Stream', icon: Eye },
  { id: 'comments', name: 'Comments / Reviews', icon: MessageSquare },
  { id: 'premium', name: 'Premium / Tools', icon: ShieldCheck },
];

// ۲. بانک آیکون‌های کمکی
const FALLBACK_ICONS: Record<string, string> = {
  'tiktok': 'https://img.icons8.com/color/144/tiktok.png',
  'instagram': 'https://img.icons8.com/color/144/instagram-new.png',
  'facebook': 'https://img.icons8.com/color/144/facebook-new.png',
  'youtube': 'https://img.icons8.com/color/144/youtube-play.png',
  'twitter': 'https://img.icons8.com/color/144/twitterx--v2.png',
  'x': 'https://img.icons8.com/color/144/twitterx--v2.png',
  'telegram': 'https://img.icons8.com/color/144/telegram-app.png',
  'linkedin': 'https://img.icons8.com/color/144/linkedin.png',
  'whatsapp': 'https://img.icons8.com/color/144/whatsapp.png',
  'spotify': 'https://img.icons8.com/color/144/spotify.png',
  'threads': 'https://img.icons8.com/color/144/threads.png',
  'pinterest': 'https://img.icons8.com/color/144/pinterest.png',
  'snapchat': 'https://img.icons8.com/color/144/snapchat.png',
  'twitch': 'https://img.icons8.com/color/144/twitch.png',
  'reddit': 'https://img.icons8.com/color/144/reddit.png',
  'google': 'https://img.icons8.com/color/144/google-logo.png',
  'chatgpt': 'https://img.icons8.com/fluent/144/chatgpt.png',
  'windows': 'https://img.icons8.com/color/144/windows-11.png',
  'microsoft': 'https://img.icons8.com/color/144/microsoft.png',
  'pubg': 'https://img.icons8.com/color/144/pubg.png',
  'freefire': 'https://i.ibb.co/XFf56bL/freefire.png',
  'capcut': 'https://i.ibb.co/LvbCXZL/capcut.png',
  'adobe': 'https://img.icons8.com/color/144/adobe-creative-cloud.png',
  'default': 'https://img.icons8.com/color/144/services.png'
};

export default function ServicesPage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [platforms, setPlatforms] = useState<any[]>([]); 
  const [categories, setCategories] = useState<Record<number, number>>({}); 
  const [services, setServices] = useState<any[]>([]); 
  const [filteredServices, setFilteredServices] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const [activeType, setActiveType] = useState('all'); 
  const [activePlatformId, setActivePlatformId] = useState('all'); 

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        const { data: platData } = await supabase
          .from('smm_platforms')
          .select('id, name, image_url, is_active')
          .eq('is_active', true)
          .order('name', { ascending: true });
          
        const { data: catData } = await supabase
          .from('smm_categories')
          .select('id, platform_id')
          .eq('is_active', true);

        const catMap: Record<number, number> = {};
        catData?.forEach(cat => {
          if (cat.platform_id) {
            catMap[cat.id] = cat.platform_id;
          }
        });
        
        const { data: servData } = await supabase
          .from('smm_services')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true });

        setPlatforms(platData || []);
        setCategories(catMap);
        setServices(servData || []);
        setFilteredServices(servData || []);
      } catch (error) {
        console.error("Error loading services data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const matchServiceType = (serviceName: string, type: string) => {
    if (!serviceName) return false;
    const nameLower = serviceName.toLowerCase();
    
    if (type === 'all') return true;
    if (type === 'followers') return nameLower.includes('follower') || nameLower.includes('member') || nameLower.includes('subscriber') || nameLower.includes('join') || nameLower.includes('saves');
    if (type === 'likes') return nameLower.includes('like') || nameLower.includes('reaction') || nameLower.includes('emoticon') || nameLower.includes('react') || nameLower.includes('upvote');
    if (type === 'views') return nameLower.includes('view') || nameLower.includes('stream') || nameLower.includes('play') || nameLower.includes('watch time') || nameLower.includes('viewer') || nameLower.includes('share');
    if (type === 'comments') return nameLower.includes('comment') || nameLower.includes('review') || nameLower.includes('custom');
    if (type === 'premium') return nameLower.includes('subscription') || nameLower.includes('tools') || nameLower.includes('premium') || nameLower.includes('apps') || nameLower.includes('license') || nameLower.includes('account');
    return false;
  };

  const applyFilters = (type: string, platformId: string) => {
    setActiveType(type);
    setActivePlatformId(platformId);

    const result = services.filter(s => {
      const servicePlatformId = categories[s.category_id];
      const matchesPlatform = platformId === 'all' || String(servicePlatformId) === String(platformId);
      const matchesType = matchServiceType(s.name, type);
      return matchesPlatform && matchesType;
    });

    setFilteredServices(result);
  };

  const getPlatformIcon = (serviceCategoryId: number) => {
    const platformId = categories[serviceCategoryId];
    const parentPlatform = platforms.find(p => p.id === platformId);
    
    if (parentPlatform?.image_url) return parentPlatform.image_url;
    
    const platName = (parentPlatform?.name || '').toLowerCase();
    const matchedKey = Object.keys(FALLBACK_ICONS).find(key => platName.includes(key));
    return FALLBACK_ICONS[matchedKey || 'default'];
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* ─── Background Glows ─── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-100/60 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* ─── Header Section (Clean Deep Blue) ─── */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 rounded-[2.5rem] p-10 sm:p-12 overflow-hidden shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)] relative">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Server size={14} className="animate-pulse text-sky-300" /> Infrastructure Catalog
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              Sultan <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">Service Matrix</span>
            </h2>
            <p className="text-blue-100 font-medium text-sm mt-4 leading-relaxed max-w-lg opacity-90">
              Access the most advanced SMM and digital tools. Select your target network and deploy campaigns with maximum efficiency.
            </p>
          </div>
        </div>

        {/* ─── Horizontal Control Panel (Filters & Platforms) ─── */}
        <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(37,99,235,0.08)] flex flex-col xl:flex-row gap-4 items-center">
          
          {/* Categories (Types) */}
          <div className="flex w-full xl:w-auto overflow-x-auto gap-2 pb-2 xl:pb-0 hide-scrollbar border-b xl:border-b-0 xl:border-r border-slate-100 xl:pr-4">
            <div className="flex items-center gap-2 px-3 py-2 text-slate-400">
              <Filter size={18} />
            </div>
            {SERVICE_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => applyFilters(type.id, activePlatformId)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                      : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-blue-600' : ''} />
                  {type.name}
                </button>
              );
            })}
          </div>

          {/* Platforms */}
          <div className="flex w-full overflow-x-auto gap-2 pb-2 xl:pb-0 hide-scrollbar">
            <button
              onClick={() => applyFilters(activeType, 'all')}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shrink-0 ${
                activePlatformId === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              <LayoutGrid size={14} />
              All Networks
            </button>

            {platforms.map((plat) => {
              const isActive = activePlatformId === String(plat.id);
              const nameLower = plat.name.toLowerCase();
              const fallbackKey = Object.keys(FALLBACK_ICONS).find(k => nameLower.includes(k)) || 'default';
              const finalIcon = plat.image_url || FALLBACK_ICONS[fallbackKey];

              return (
                <button
                  key={plat.id}
                  onClick={() => applyFilters(activeType, String(plat.id))}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shrink-0 border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-[0_5px_15px_rgba(37,99,235,0.3)]'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200 hover:bg-blue-50/50'
                  }`}
                >
                  <img 
                    src={finalIcon} 
                    alt={plat.name} 
                    className="w-4 h-4 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_ICONS['default']; }}
                  />
                  {plat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Services List ─── */}
        <div className="space-y-5">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              Active Pipelines
            </h3>
            <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-4 py-2 rounded-xl uppercase tracking-widest">
              {filteredServices.length} Results
            </span>
          </div>

          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-5 bg-white rounded-[3rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-slate-400 font-black tracking-[0.3em] uppercase text-[10px]">Querying Nodes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filteredServices.map((s) => {
                const pricePer10K = (parseFloat(s.price || '0') * 10).toFixed(2);
                const cardPlatformIcon = getPlatformIcon(s.category_id);

                return (
                  <div key={s.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:border-blue-200 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:-translate-y-1 relative overflow-hidden">
                    
                    <div className="flex items-start sm:items-center gap-5 w-full">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center p-3 shrink-0 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors duration-300">
                        <img 
                          src={cardPlatformIcon} 
                          alt="platform-logo" 
                          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_ICONS['default']; }}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="text-sm sm:text-base font-black text-slate-800 group-hover:text-blue-700 transition-colors uppercase tracking-tight leading-snug pr-4">
                          {s.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1 text-[9px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-widest">
                            ID: <span className="text-slate-800">{s.supplier_service_id}</span>
                          </span>
                          <span className="flex items-center gap-1 text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-widest">
                            <CheckCircle2 size={10} /> Active
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 gap-4 shrink-0">
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Rate per 10k
                        </span>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">${pricePer10K}</span>
                      </div>
                      <button 
                        onClick={() => router.push(`/dashboard/new-order?serviceId=${s.id}`)}
                        className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-blue-500/30 active:scale-95 group/btn"
                      >
                        Deploy
                        <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredServices.length === 0 && (
                <div className="col-span-1 xl:col-span-2 text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <Zap size={24} className="text-slate-300" />
                  </div>
                  <p className="font-black uppercase tracking-widest text-[11px] text-slate-400">No pipelines detected for this sector</p>
                  <button onClick={() => applyFilters('all', 'all')} className="mt-4 text-[10px] font-black text-blue-600 bg-blue-50 px-5 py-2.5 rounded-xl uppercase tracking-widest hover:bg-blue-100 transition-colors">
                    Reset Matrix
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
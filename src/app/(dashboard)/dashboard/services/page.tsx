"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { 
  UserPlus, Heart, Eye, MessageSquare, ShieldCheck, 
  LayoutGrid, Loader2, ArrowUpRight, Zap 
} from 'lucide-react';

// ۱. فیلترهای سایدبار بر اساس کلمات کلیدی نام خدمات
const SERVICE_TYPES = [
  { id: 'all', name: 'All Services', icon: LayoutGrid },
  { id: 'followers', name: 'Followers / Members', icon: UserPlus },
  { id: 'likes', name: 'Likes / Reactions', icon: Heart },
  { id: 'views', name: 'Views / Live Stream', icon: Eye },
  { id: 'comments', name: 'Comments / Reviews', icon: MessageSquare },
  { id: 'premium', name: 'Subscriptions / Tools', icon: ShieldCheck },
];

// ۲. بانک آیکون‌های کمکی زمانی که دیتابیس تصویر ندارد
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
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 font-sans">
      
      {/* هدر */}
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-3">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
          <span className="text-emerald-600">2X</span> PREMIUM HUB
        </h2>
        <p className="text-slate-400 font-semibold text-xs">Unified engine optimized for 10K package distribution.</p>
      </div>

      {/* ─── بخش کپسول‌های پلتفرم: بدون اسکرول و تمام‌صفحه ─── */}
      <div className="space-y-2 bg-slate-50/60 p-4 rounded-3xl border border-slate-100">
        <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.3em] px-1">Select Platform</h3>
        
        {/* استفاده از flex-wrap بدون هاردکد ارتفاع برای باز شدن کامل همه‌ی کپسول‌ها */}
        <div className="flex flex-wrap gap-1.5 p-0.5">
          
          {/* دکمه All */}
          <button
            onClick={() => applyFilters(activeType, 'all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all border select-none ${
              activePlatformId === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10'
                : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-500 hover:bg-white'
            }`}
          >
            <LayoutGrid size={12} className={activePlatformId === 'all' ? 'text-emerald-400' : 'text-slate-400'} />
            <span>All Platforms</span>
          </button>

          {/* رندر همه‌ی پلتفرم‌ها در کنار هم به شکل میکرو-کپسول */}
          {platforms.map((plat) => {
            const isActive = activePlatformId === String(plat.id);
            const nameLower = plat.name.toLowerCase();
            const fallbackKey = Object.keys(FALLBACK_ICONS).find(k => nameLower.includes(k)) || 'default';
            const finalIcon = plat.image_url || FALLBACK_ICONS[fallbackKey];

            return (
              <button
                key={plat.id}
                onClick={() => applyFilters(activeType, String(plat.id))}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all border select-none ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200/60 hover:border-emerald-500 hover:shadow-sm'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <img 
                    src={finalIcon} 
                    alt={plat.name} 
                    className="w-full h-full object-contain filter drop-shadow-xs"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_ICONS['default']; }}
                  />
                </div>
                <span>{plat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── بخش پایینی: سایدبار خدمات + لیست محصولات ─── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start pt-2">
        
        {/* سایدبار نوع خدمت */}
        <aside className="w-full lg:w-64 bg-white p-3 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/40 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible shrink-0 lg:sticky lg:top-6">
          {SERVICE_TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = activeType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => applyFilters(type.id, activePlatformId)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap w-full text-left ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 lg:translate-x-1' 
                    : 'text-slate-500 bg-slate-50/50 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-emerald-500' : 'text-slate-400'} />
                <span>{type.name}</span>
              </button>
            );
          })}
        </aside>

        {/* لیست محصولات */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Offers Pipeline</h3>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 uppercase">
              {filteredServices.length} packages active
            </span>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
              <Loader2 className="animate-spin text-emerald-600" size={32} />
              <p className="text-slate-400 font-black tracking-widest uppercase text-[9px]">Querying Cluster Node...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredServices.map((s) => {
                const pricePer10K = (parseFloat(s.price || '0') * 10).toFixed(2);
                const cardPlatformIcon = getPlatformIcon(s.category_id);

                return (
                  <div key={s.id} className="group bg-white p-5 sm:p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-50/40 hover:border-emerald-200 transition-all duration-500 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5 w-full">
                      <div className="flex w-14 h-14 bg-slate-50/80 rounded-2xl items-center justify-center p-2.5 shrink-0 border border-slate-100/70 group-hover:bg-white group-hover:border-emerald-100 transition-colors duration-300">
                        <img 
                          src={cardPlatformIcon} 
                          alt="platform-logo" 
                          className="w-full h-full object-contain filter drop-shadow-2xs group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_ICONS['default']; }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-black text-slate-800 group-hover:text-emerald-700 transition-colors uppercase italic tracking-tight leading-tight">
                          {s.name}
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 font-medium line-clamp-1">
                          {s.description || 'Premium stable delivery channel with automatic fallback API optimization.'}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">ID: {s.supplier_service_id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100/60 px-2 py-0.5 rounded-md uppercase tracking-wider mb-1">Per 10,000</span>
                        <div className="flex items-baseline gap-1">
                           <span className="text-2xl font-black text-slate-900 tracking-tighter">${pricePer10K}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => router.push(`/dashboard/new-order?serviceId=${s.id}`)}
                        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs hover:bg-emerald-600 transition-all shadow-xl active:scale-95 group/btn"
                      >
                        ORDER 
                        <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredServices.length === 0 && (
                <div className="text-center py-20 bg-white border border-slate-100 rounded-[3rem] opacity-50">
                  <Zap size={36} className="mx-auto mb-3 text-slate-300 animate-pulse" />
                  <p className="font-black uppercase italic tracking-widest text-xs text-slate-400">No active products match this configuration</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
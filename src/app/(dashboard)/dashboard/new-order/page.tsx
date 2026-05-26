"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { 
  Globe, ChevronDown, ArrowRight, Wallet, CreditCard, Coins, Loader2, Server, Zap, CheckCircle2
} from 'lucide-react';

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
  'default': 'https://img.icons8.com/color/144/services.png'
};

// اضافه شدن Atoma Pay به لیست درگاه‌ها با استایل طلایی
const PAYMENT_GATEWAYS = [
  { id: 'hesabpay', name: 'HesabPay', icon: Wallet, color: 'bg-blue-600', status: 'active' },
  { id: 'atomapay', name: 'Atoma Pay', icon: Wallet, color: 'bg-amber-500', status: 'active' },
  { id: 'crypto', name: 'Crypto', icon: Coins, color: 'bg-sky-500', status: 'active' },
  { id: 'stripe', name: 'Stripe (Card)', icon: CreditCard, color: 'bg-slate-300', status: 'soon' },
  { id: 'paypal', name: 'PayPal', icon: Globe, color: 'bg-slate-300', status: 'soon' },
];

export default function NewOrderPage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1000); 
  const [link, setLink] = useState('');
  const [showGateways, setShowGateways] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); 
  const [isCheckingDiscount, setIsCheckingDiscount] = useState(false);
  const [discountMessage, setDiscountMessage] = useState({ type: '', text: '' }); 

  // استیت برای انیمیشن شوخی قیمت
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile } = await supabase.from('profiles').select('balance').eq('id', user.id).single();
          if (profile) setUserBalance(profile.balance || 0);

          const { data: platData } = await supabase.from('smm_platforms').select('*').eq('is_active', true).order('name', { ascending: true });
          setPlatforms(platData || []);

          const { data: catData } = await supabase.from('smm_categories').select('*').eq('is_active', true);
          setCategories(catData || []);

          const { data: services } = await supabase.from('smm_services').select('*').eq('is_active', true);
          setAllServices(services || []);
        }
      } catch (err) {
        console.error("Error loading order context:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [supabase]);

  const handlePlatformSelect = (plat: any) => {
    setSelectedPlatform(plat);
    setIsDropdownOpen(false);
    setSelectedService(null);
    setShowGateways(false);
    setAppliedDiscount(0);
    setDiscountCode('');
    setDiscountMessage({ type: '', text: '' });

    const matchedCategoryIds = categories
      .filter(c => c.platform_id === plat.id)
      .map(c => c.id);

    const matchedServices = allServices.filter(s => matchedCategoryIds.includes(s.category_id));
    setFilteredServices(matchedServices);
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setIsCheckingDiscount(true);
    setDiscountMessage({ type: '', text: '' }); 

    const { data, error } = await supabase
      .from('smm_coupons')
      .select('discount_percent, max_uses, used_count')
      .eq('code', discountCode.trim().toUpperCase())
      .eq('is_active', true)
      .maybeSingle(); 

    if (error || !data) {
      setAppliedDiscount(0);
      setDiscountMessage({ type: 'error', text: 'Invalid or expired code. ❌' });
    } else if (data.used_count >= data.max_uses) {
      setAppliedDiscount(0);
      setDiscountMessage({ type: 'error', text: 'Coupon limit reached! ⚠️' });
    } else {
      setAppliedDiscount(data.discount_percent / 100);
      setDiscountMessage({ type: 'success', text: `Success! ${data.discount_percent}% off applied. ✅` });
    }
    
    setIsCheckingDiscount(false);
  };

  const isFixedProduct = selectedService && 
    (selectedService.name.toLowerCase().includes("month") || 
     selectedService.name.toLowerCase().includes("year") || 
     selectedService.name.toLowerCase().includes("license") || 
     selectedService.name.toLowerCase().includes("personal") || 
     selectedService.name.toLowerCase().includes("pro"));

  const calculateBasePrice = () => {
    if (!selectedService) return 0;
    return isFixedProduct ? selectedService.price : (selectedService.price * quantity / 1000);
  };

  const calculateTotal = () => {
    const basePrice = calculateBasePrice();
    const discountedPrice = basePrice - (basePrice * appliedDiscount);
    return discountedPrice < 0.01 && discountedPrice > 0 ? 0.01 : discountedPrice;
  };

  const totalAmount = calculateTotal();

  // تریگر کردن انیمیشن هربار که قیمت نهایی تغییر می‌کند
  useEffect(() => {
    if (totalAmount > 0) {
      setIsPriceAnimating(true);
      const timer = setTimeout(() => setIsPriceAnimating(false), 400); // زمان انیمیشن
      return () => clearTimeout(timer);
    }
  }, [totalAmount]);

  const handlePayment = async (gatewayId: string, status: string) => {
    if (status === 'soon') {
      alert("این روش پرداخت به زودی فعال خواهد شد.");
      return;
    }

    if (!selectedService || !link || totalAmount <= 0) {
      alert("Please complete the order details first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // مسیریابی برای HesabPay
      if (gatewayId === 'hesabpay') {
        const response = await fetch(`/api/checkout/hesabpay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            userId: user?.id,
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            link: link,
            quantity: isFixedProduct ? 1 : quantity,
            transactionInfo: "Pending Scan"
          }),
        });

        const data = await response.json();
        if (data.success) {
          router.push(`/dashboard/confirm-payment?amount=${totalAmount}&serviceName=${encodeURIComponent(selectedService.name)}`);
        } else {
          alert("Error: " + data.error);
        }
        return;
      }

      // مسیریابی برای Atoma Pay (حذف کلمه dashboard)
      if (gatewayId === 'atomapay') {
        const queryParams = new URLSearchParams({
          amount: totalAmount.toString(),
          serviceName: selectedService.name,
          serviceId: selectedService.id.toString(),
          quantity: isFixedProduct ? '1' : quantity.toString(),
          link: link
        }).toString();
        
        router.push(`/atomapay?${queryParams}`);
        return;
      }

      // سایر درگاه‌ها (مثل کریپتو)
      const response = await fetch(`/api/checkout/${gatewayId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          userId: user?.id,
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          link: link,
          quantity: isFixedProduct ? 1 : quantity,
          transactionInfo: ""
        }),
      });

      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert("Error: " + (data.error || "Payment initiation failed."));
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4 bg-white max-w-7xl mx-auto rounded-[3rem] border border-slate-100 shadow-sm">
        <Loader2 className="animate-spin text-blue-600" size={44} />
        <p className="text-slate-400 font-black tracking-widest uppercase text-xs">Loading Cloud Gateway Engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 px-4 pt-10 animate-in fade-in duration-700 font-sans">
      
      {/* هدر صفحه */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-max shadow-sm mb-2">
          <Server size={14} /> Deployment Node
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">
          Deploy <span className="text-blue-600">Order</span>
        </h2>
        <p className="text-slate-500 font-medium px-1 text-sm sm:text-base">Configure your package and launch your campaign instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* ─── فرم اصلی (سمت چپ) ─── */}
        <div className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.05)] space-y-8">
          
          <div className="space-y-3 relative z-50">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">1. Target Network</label>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all flex items-center justify-between group outline-none"
            >
              {selectedPlatform ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 p-1.5 bg-white rounded-lg flex items-center justify-center border border-slate-100 shadow-sm">
                    <img 
                      src={selectedPlatform.image_url || FALLBACK_ICONS[selectedPlatform.name.toLowerCase()] || FALLBACK_ICONS['default']} 
                      alt={selectedPlatform.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-black text-slate-800 uppercase tracking-tight">{selectedPlatform.name}</span>
                </div>
              ) : <span className="font-bold text-slate-400">Choose a platform...</span>}
              <ChevronDown className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180 text-blue-500' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] z-[100] max-h-[350px] overflow-y-auto p-4 flex flex-wrap gap-2 animate-in fade-in zoom-in-95 custom-scrollbar">
                {platforms.map((plat) => {
                  const nameLower = plat.name.toLowerCase();
                  const finalIconUrl = plat.image_url || FALLBACK_ICONS[nameLower] || FALLBACK_ICONS['default'];
                  return (
                    <button 
                      key={plat.id} 
                      onClick={() => handlePlatformSelect(plat)} 
                      className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 rounded-xl border border-slate-100 transition-all text-left"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        <img src={finalIconUrl} alt={plat.name} className="w-full h-full object-contain drop-shadow-sm" />
                      </div>
                      <span className="font-bold text-xs text-slate-700 uppercase tracking-tight">{plat.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-3 relative z-40">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">2. Package Type</label>
            <div className="relative">
              <select 
                disabled={!selectedPlatform} 
                className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-slate-800 disabled:opacity-50 appearance-none transition-all cursor-pointer" 
                value={selectedService?.id || ""} 
                onChange={(e) => setSelectedService(filteredServices.find(s => String(s.id) === String(e.target.value)))}
              >
                <option value="">Select an available service...</option>
                {filteredServices.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-3 z-30">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">3. Destination URL</label>
            <div className="relative">
              <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500/50" size={20} />
              <input 
                type="text" 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
                className="w-full pl-14 pr-5 py-5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-slate-800 placeholder:text-slate-400 transition-all" 
                placeholder="https://" 
              />
            </div>
          </div>

          <div className="space-y-3 z-20">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">4. Volume</label>
            <input 
              type="number" 
              value={quantity} 
              className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none font-black text-xl text-slate-800 transition-all"
              onChange={(e) => setQuantity(Number(e.target.value))} 
              placeholder="e.g. 1000"
            />
          </div>

          <div className="pt-4 z-10">
            {!showGateways ? (
              <button 
                onClick={() => (selectedService && link) ? setShowGateways(true) : alert("Please complete the order details first.")}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex justify-center items-center gap-3 shadow-[0_10px_20px_rgba(37,99,235,0.2)] active:scale-[0.98]"
              >
                PROCEED TO CHECKOUT <ArrowRight size={20} />
              </button>
            ) : (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl animate-in slide-in-from-bottom-4 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={18} className="text-blue-600" />
                  <span className="font-black text-slate-800 uppercase tracking-tight text-sm">Select Payment Method</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {PAYMENT_GATEWAYS.map((gt) => (
                    <button 
                      key={gt.id} 
                      onClick={() => handlePayment(gt.id, gt.status)}
                      disabled={isSubmitting || gt.status === 'soon'}
                      className={`relative flex flex-col items-center justify-center p-5 rounded-[1.5rem] border-2 transition-all group ${
                        gt.status === 'soon' 
                          ? 'opacity-60 bg-slate-100 border-slate-200 cursor-not-allowed grayscale' 
                          : 'bg-white border-slate-200 hover:border-blue-500 hover:shadow-[0_10px_20px_rgba(37,99,235,0.1)] active:scale-95'
                      }`}
                    >
                      <div className={`${gt.color} p-3 rounded-xl text-white mb-3 shadow-md ${gt.status !== 'soon' && 'group-hover:scale-110'} transition-transform`}>
                        <gt.icon size={24} />
                      </div>
                      <span className={`font-black text-[10px] uppercase tracking-widest text-center ${gt.status === 'soon' ? 'text-slate-400' : 'text-slate-700'}`}>
                        {gt.name}
                      </span>
                      {gt.status === 'soon' && (
                        <span className="absolute top-3 right-3 text-[8px] font-black text-slate-500 bg-slate-200 px-2 py-1 rounded-md uppercase">Soon</span>
                      )}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowGateways(false)} className="w-full text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors text-center pt-2">
                  ← Edit Order Details
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── فاکتور و خلاصه سفارش (سمت راست) ─── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-blue-100 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.1)] sticky top-28 overflow-hidden relative">
            
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>

            <div className="mb-8 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl text-blue-600"><Wallet size={20} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Wallet Balance</span>
              </div>
              <span className="text-xl font-black text-slate-900">${userBalance.toFixed(2)}</span>
            </div>

            {selectedService ? (
              <div className="space-y-8 relative z-10">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-slate-800 tracking-tight leading-snug border-b border-slate-100 pb-6">
                  {selectedService.name}
                </h3>
                
                {/* ─── بخش کد تخفیف ─── */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Discount Code"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 uppercase outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button 
                      onClick={handleApplyDiscount}
                      className="bg-slate-900 text-white px-5 rounded-xl font-black text-xs hover:bg-blue-600 transition-all flex items-center justify-center min-w-[80px] shadow-sm"
                    >
                      {isCheckingDiscount ? <Loader2 className="animate-spin" size={16} /> : "APPLY"}
                    </button>
                  </div>
                  
                  {discountMessage.text && (
                    <div className={`text-[11px] font-black tracking-wide px-1 ${discountMessage.type === 'error' ? 'text-red-500' : 'text-blue-600'}`}>
                      {discountMessage.text}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span>Base Amount</span>
                    <span className="text-slate-800">${calculateBasePrice().toFixed(2)}</span>
                  </div>
                  
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                      <span>Discount ({appliedDiscount * 100}%)</span>
                      <span>-${(calculateBasePrice() * appliedDiscount).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Total Amount</p>
                    <div className="flex items-baseline gap-1 perspective-1000">
                      {/* ─── انیمیشن شیطنت‌آمیز قیمت با استایل لوکس (طلایی) ─── */}
                      <span className={`text-5xl font-black tracking-tighter inline-block transition-all duration-500 ease-out cursor-pointer hover:scale-110 hover:rotate-3 ${
                        isPriceAnimating 
                          ? 'scale-125 -translate-y-3 text-amber-500 rotate-[-5deg] drop-shadow-md' 
                          : 'text-blue-600 hover:text-amber-500'
                      }`}>
                        ${totalAmount.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-slate-500 uppercase ml-1">USD</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 opacity-50 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mb-4">
                  <Zap size={24} className="text-slate-400 animate-pulse" />
                </div>
                <p className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-500">Awaiting Service Selection</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
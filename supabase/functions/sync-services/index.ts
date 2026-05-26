import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUPPLIER_API_URL = Deno.env.get('SUPPLIER_API_URL');
const SUPPLIER_API_KEY = Deno.env.get('SUPPLIER_API_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const STATIC_PLATFORMS = [
  { id: 152, name: 'TikTok', keywords: ['tiktok'] },
  { id: 153, name: 'Twitter', keywords: ['twitter', 'tweet', 'x ', 'x ('] },
  { id: 154, name: 'Instagram', keywords: ['instagram', 'insta', 'ig '] },
  { id: 155, name: 'YouTube', keywords: ['youtube', 'yt '] },
  { id: 156, name: 'Facebook', keywords: ['facebook', 'fb '] },
  { id: 157, name: 'Premium Tools', keywords: ['premium tools'] },
  { id: 166, name: 'Linkedin', keywords: ['linkedin'] },
  { id: 167, name: 'Telegram', keywords: ['telegram', 'tg '] },
  { id: 191, name: 'Spotify', keywords: ['spotify'] },
  { id: 195, name: 'Twitch', keywords: ['twitch'] }
];

const ICON_DATABASE: Record<string, string> = {
  'tiktok': 'https://img.icons8.com/color/144/tiktok.png',
  'instagram': 'https://img.icons8.com/color/144/instagram-new.png',
  'facebook': 'https://img.icons8.com/color/144/facebook-new.png',
  'youtube': 'https://img.icons8.com/color/144/youtube-play.png',
  'twitter': 'https://img.icons8.com/color/144/twitterx--v2.png',
  'telegram': 'https://img.icons8.com/color/144/telegram-app.png',
  'linkedin': 'https://img.icons8.com/color/144/linkedin.png',
  'spotify': 'https://img.icons8.com/color/144/spotify.png',
  'default': 'https://img.icons8.com/color/144/services.png'
};

function getTargetPlatformId(categoryName: string): number {
  const lower = categoryName.toLowerCase();
  for (const plat of STATIC_PLATFORMS) {
    if (plat.keywords.some(keyword => lower.includes(keyword))) return plat.id;
  }
  return 157; 
}

async function processServiceSync() {
  if (!SUPPLIER_API_URL || !SUPPLIER_API_KEY) throw new Error("کلیدهای تامین‌کننده تنظیم نشده است.");

  // --- مرحله ۰: تزریق خودکار پلتفرم‌ها برای جلوگیری از ارور Foreign Key ---
  const platformsToSeed = STATIC_PLATFORMS.map(p => ({ id: p.id, name: p.name, is_active: true }));
  const { error: seedErr } = await supabase.from('smm_platforms').upsert(platformsToSeed);
  if (seedErr) throw new Error(`خطا در ایجاد پلتفرم‌های پایه: ${seedErr.message}`);

  // --- مرحله ۱: دریافت دیتا ---
  const response = await fetch(SUPPLIER_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: SUPPLIER_API_KEY, action: 'services' })
  });
  if (!response.ok) throw new Error(`خطای تامین کننده: ${response.status}`);
  const services = await response.json();
  if (!Array.isArray(services)) throw new Error("دیتا معتبر نیست.");

  // --- مرحله ۲: حافظه کش دسته‌بندی‌ها ---
  const categoryCache: Record<string, number> = {};
  const { data: existingCategories, error: catFetchErr } = await supabase.from('smm_categories').select('id, name, platform_id');
  if (catFetchErr) throw new Error(`خطا در خواندن دسته‌بندی‌ها: ${catFetchErr.message}`);
  
  existingCategories?.forEach(c => { categoryCache[`${c.name.toLowerCase().trim()}_${c.platform_id}`] = c.id; });

  // --- مرحله ۳: ایجاد دسته‌بندی‌های جدید ---
  const missingCategoriesMap = new Map();
  for (const item of services) {
    if (!item?.service) continue;
    const catName = (item.category || 'Other').trim();
    const platId = getTargetPlatformId(catName);
    const key = `${catName.toLowerCase()}_${platId}`;
    if (!categoryCache[key] && !missingCategoriesMap.has(key)) {
      missingCategoriesMap.set(key, { name: catName, is_active: true, platform_id: platId });
    }
  }

  if (missingCategoriesMap.size > 0) {
    const { data: newCats, error: catInsertErr } = await supabase
      .from('smm_categories')
      .insert(Array.from(missingCategoriesMap.values()))
      .select('id, name, platform_id');
    
    if (catInsertErr) throw new Error(`خطا در ساخت دسته‌بندی‌ها در دیتابیس: ${catInsertErr.message}`);
    newCats?.forEach(c => { categoryCache[`${c.name.toLowerCase().trim()}_${c.platform_id}`] = c.id; });
  }

  // --- مرحله ۴: آماده‌سازی پکیج محصولات ---
  const servicesToUpsert = [];
  for (const item of services) {
    if (!item?.service) continue;
    const catName = (item.category || 'Other').trim();
    const platId = getTargetPlatformId(catName);
    const categoryId = categoryCache[`${catName.toLowerCase()}_${platId}`];

    if (!categoryId) continue; // جلوگیری از ارور دیتابیس در صورت نبود آیدی کتگوری

    const baseCost = parseFloat(item.rate || '0');
    const finalPrice = baseCost * 5.00;

    servicesToUpsert.push({
      supplier_service_id: String(item.service),
      category_id: categoryId,
      name: item.name || 'Unnamed',
      base_cost: baseCost,
      markup_price: finalPrice,
      price: finalPrice,
      description: item.description || '', 
      is_active: true
    });
  }

  // --- مرحله ۵: ذخیره نهایی محصولات ---
  const chunkSize = 1000;
  let insertedCount = 0;
  for (let i = 0; i < servicesToUpsert.length; i += chunkSize) {
    const chunk = servicesToUpsert.slice(i, i + chunkSize);
    const { error: upsertErr } = await supabase.from('smm_services').upsert(chunk, { onConflict: 'supplier_service_id' });
    if (upsertErr) throw new Error(`خطا در ذخیره محصولات (ردیف ${i}): ${upsertErr.message}`);
    insertedCount += chunk.length;
  }

  return insertedCount;
}

async function processIconSync() {
  const { data: platforms, error: platErr } = await supabase.from('smm_platforms').select('id, name');
  if (platErr) throw new Error(`خطا در خواندن پلتفرم‌ها: ${platErr.message}`);
  if (!platforms || platforms.length === 0) return 0;

  let updatedCount = 0;
  for (const plat of platforms) {
    const nameLower = plat.name.toLowerCase().trim();
    let matchedKey = 'default';
    for (const key of Object.keys(ICON_DATABASE)) {
      if (nameLower.includes(key)) { matchedKey = key; break; }
    }
    const finalIconUrl = ICON_DATABASE[matchedKey];
    const { error } = await supabase.from('smm_platforms').update({ image_url: finalIconUrl }).eq('id', plat.id);
    if (!error) updatedCount++;
  }
  return updatedCount;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ 
        status: "WARNING", 
        message: "فرمت JSON اشتباه است! مطمئن شوید از دابل-کوتیشن (\"\") استفاده کرده‌اید."
      }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { action, serviceId } = body;

    if (action === 'sync-services') {
      const count = await processServiceSync();
      return new Response(JSON.stringify({ success: true, message: `${count} سرویس آپدیت شد.` }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === 'sync-icons') {
      const count = await processIconSync();
      return new Response(JSON.stringify({ success: true, message: `${count} آیکون آپدیت شد.` }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    
    if (action === 'get-description') {
      if (!serviceId) return new Response(JSON.stringify({ description: "" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const { data } = await supabase.from('smm_services').select('description').eq('id', serviceId).maybeSingle();
      return new Response(JSON.stringify({ description: data?.description || "" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ status: "WARNING", message: "اکشن اشتباه است." }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err: any) {
    return new Response(JSON.stringify({ status: "ERROR_TRAP", error: err?.message || String(err) }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
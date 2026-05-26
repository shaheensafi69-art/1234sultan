import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
  apiVersion: '2023-10-16' as any 
});

// تابع کمکی برای ارسال پیام موازی به هر دو ربات تلگرام
async function sendTelegramNotification(message: string) {
  const token1 = process.env.TELEGRAM_BOT_TOKEN;
  const chatId1 = process.env.TELEGRAM_CHAT_ID;
  
  const token2 = process.env.TELEGRAM_BOT_TOKEN_2;
  const chatId2 = process.env.TELEGRAM_CHAT_ID_2;

  await Promise.all([
    (async () => {
      if (!token1 || !chatId1) return;
      try {
        await fetch(`https://api.telegram.org/bot${token1}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId1, text: message, parse_mode: 'HTML' }),
        });
      } catch (err) {
        console.error("❌ Failed to send to Telegram Robot 1:", err);
      }
    })(),

    (async () => {
      if (!token2 || !chatId2) return;
      try {
        await fetch(`https://api.telegram.org/bot${token2}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId2, text: message, parse_mode: 'HTML' }),
        });
      } catch (err) {
        console.error("❌ Failed to send to Telegram Robot 2:", err);
      }
    })()
  ]);
}

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! 
  );

  try {
    // 🔒 قفل امنیتی استرایپ: جلوگیری از درخواست‌های فیک
    const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      console.log("🔔 Webhook Received. Session:", session.id);

      const userId = metadata?.userId || 'f76c21e7-fbd9-4700-8fb0-2992a4bf1078';
      const internalServiceId = metadata?.serviceId || '84'; 
      const link = metadata?.link || 'No Link Provided';
      const quantity = metadata?.quantity || '1000';

      let supplierOrderId = null;
      let realSupplierId = null;

      // ۱. پیدا کردن آیدی ۴ رقمی سپلایر
      if (internalServiceId) {
        const { data: serviceData } = await supabase
          .from('smm_services')
          .select('supplier_service_id, name')
          .eq('id', parseInt(internalServiceId))
          .single();
        
        realSupplierId = serviceData?.supplier_service_id;
      }

      // ۲. ارسال به FameGrows (استفاده از متغیرهای محیطی برای امنیت)
      if (realSupplierId && metadata?.link) {
        try {
          const formData = new URLSearchParams();
          formData.append('key', process.env.SUPPLIER_API_KEY!); 
          formData.append('action', 'add');
          formData.append('service', realSupplierId); 
          formData.append('link', link);
          formData.append('quantity', quantity);

          const supplierApiUrl = process.env.SUPPLIER_API_URL || 'https://famegrows.com/api/v2';
          const supplierResponse = await fetch(supplierApiUrl, {
            method: 'POST',
            body: formData,
          });
          const result = await supplierResponse.json();
          
          if (result.order) {
            supplierOrderId = String(result.order);
          }
        } catch (err) {
          console.error("❌ FameGrows API Error:", err);
        }
      }

      // ۳. ثبت در دیتابیس
      // توجه: session.amount_total دقیقاً مبلغ پرداختی بعد از کسر کد تخفیف را ثبت می‌کند که عالی است
      const { error: dbError } = await supabase.from('smm_orders').insert({
        user_id: userId, 
        service_id: parseInt(internalServiceId),
        link: link,
        quantity: parseInt(quantity),
        total_cost: session.amount_total ? session.amount_total / 100 : 0, 
        status: supplierOrderId ? 'processing' : 'pending_manual_check',
        supplier_order_id: supplierOrderId
      });

      // ۴. گزارش تلگرام
      const statusEmoji = supplierOrderId ? "✅" : "⚠️";
      const telegramMessage = `
${statusEmoji} <b>اردر جدید در 2X Followers (Stripe)</b>
━━━━━━━━━━━━━━━━━━
<b>👤 کاربر:</b> <code>${userId}</code>
<b>📦 آیدی سپلایر:</b> <code>${realSupplierId || 'یافت نشد'}</code>
<b>🔢 تعداد:</b> <code>${quantity}</code>
<b>🔗 لینک:</b> ${link}
<b>💰 مبلغ پرداختی:</b> $${session.amount_total ? session.amount_total / 100 : 0}
<b>🆔 کد پیگیری سپلایر:</b> <code>${supplierOrderId || 'نیاز به بررسی دستی'}</code>
<b>📢 وضعیت:</b> ${supplierOrderId ? 'در حال انجام (API)' : 'ثبت شده (بدون اتصال به API)'}
━━━━━━━━━━━━━━━━━━
`;
      await sendTelegramNotification(telegramMessage);

      if (dbError) console.error("❌ Supabase Error:", dbError.message);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
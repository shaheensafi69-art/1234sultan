import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const sig = req.headers.get('x-nowpayments-sig');

    // 🔒 قفل امنیتی صفر (IPN Verification): تایید هویت واقعی NowPayments
    if (!sig || !process.env.NOWPAYMENTS_IPN_SECRET) {
      console.error("❌ Missing NowPayments Signature or IPN Secret");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // فرمول رسمی NowPayments برای ساخت و مقایسه هش
    const sortedPayload = Object.keys(payload).sort().reduce((acc: any, key: string) => {
      acc[key] = payload[key];
      return acc;
    }, {});

    const hmac = crypto.createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET);
    hmac.update(JSON.stringify(sortedPayload));
    const calculatedSig = hmac.digest('hex');

    if (calculatedSig !== sig) {
      console.error("🚨 CRITICAL: Fake Webhook Attempt Blocked!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 🔒 قفل امنیتی اول: بررسی وضعیت پرداخت
    const paymentStatus = payload.payment_status;
    
    if (paymentStatus !== 'finished') {
      console.log(`⏳ Webhook received for status: ${paymentStatus}. Skipping processing.`);
      return NextResponse.json({ received: true, message: "Waiting for finished status" });
    }

    let orderData = { userId: "", serviceId: "", quantity: "", link: "" };

    // ۱. استخراج اطلاعات داینامیک
    if (payload.metadata && payload.metadata.serviceId) {
      orderData = {
        userId: payload.metadata.userId,
        serviceId: payload.metadata.serviceId,
        quantity: String(payload.metadata.quantity),
        link: payload.metadata.link
      };
    } else if (payload.order_id) {
      const parts = payload.order_id.split('_');
      orderData.userId = parts[0] || '0';
      orderData.serviceId = parts[1]; 
      orderData.quantity = parts[2];
      orderData.link = parts.slice(3).join('_').replace(/\|/g, '/');
    }

    if (!orderData.serviceId || !orderData.link) {
      return NextResponse.json({ error: "Invalid order metadata" }, { status: 400 });
    }

    // ۲. پیدا کردن آیدی ۴ رقمی سپلایر
    const { data: serviceData } = await supabase
      .from('smm_services')
      .select('supplier_service_id')
      .eq('id', parseInt(orderData.serviceId))
      .single();

    const supplierServiceId = serviceData?.supplier_service_id;
    let supplierResponseId = null;

    // ۳. ارسال به سپلایر با استفاده از کلیدهای امنیتی محیطی
    if (supplierServiceId) {
      try {
        const formData = new URLSearchParams();
        // کلید سپلایر را مستقیماً از فایل .env می‌خواند
        formData.append('key', process.env.SUPPLIER_API_KEY!);
        formData.append('action', 'add');
        formData.append('service', String(supplierServiceId));
        formData.append('link', orderData.link);
        formData.append('quantity', String(orderData.quantity));

        // آدرس API سپلایر را از فایل .env می‌خواند
        const supplierApiUrl = process.env.SUPPLIER_API_URL || 'https://famegrows.com/api/v2';
        const res = await fetch(supplierApiUrl, { method: 'POST', body: formData });
        const result = await res.json();
        
        if (result.order) supplierResponseId = String(result.order);
      } catch (err) {
        console.error("❌ API Error to Supplier:", err);
      }
    }

    // ۴. ثبت در دیتابیس
    const { error: dbError } = await supabase.from('smm_orders').insert({
      user_id: orderData.userId,
      service_id: parseInt(orderData.serviceId), 
      link: orderData.link,
      quantity: parseInt(orderData.quantity),
      total_cost: parseFloat(String(payload.actually_paid || payload.price_amount || "0")),
      status: supplierResponseId ? 'processing' : 'pending_manual_check',
      supplier_order_id: supplierResponseId
    });

    // ۵. گزارش تلگرام
    const dbStatus = dbError ? `❌ خطا: ${dbError.message}` : "✅ ثبت موفق در دیتابیس";
    const telegramMessage = `
💰 <b>کریپتو موفق (NowPayments)</b>
━━━━━━━━━━━━━━━━━━
<b>👤 کاربر:</b> <code>${orderData.userId}</code>
<b>📦 آیدی داخلی:</b> <code>${orderData.serviceId}</code>
<b>🆔 آیدی سپلایر:</b> <code>${supplierServiceId || 'یافت نشد'}</code>
<b>🔢 تعداد:</b> <code>${orderData.quantity}</code>
<b>💵 مبلغ دریافتی:</b> <code>${payload.actually_paid || payload.price_amount} ${payload.pay_currency || 'USD'}</code>
<b>🆔 اردر سپلایر:</b> <code>${supplierResponseId || 'Manual'}</code>
<b>🗄 دیتابیس:</b> ${dbStatus}
━━━━━━━━━━━━━━━━━━
`;

    // ارسال همزمان و موازی به هر دو ربات تلگرام
    await Promise.all([
      process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID ? 
        fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: telegramMessage, parse_mode: 'HTML' }),
        }).catch(err => console.error("Robot 1 Error:", err)) : Promise.resolve(),

      process.env.TELEGRAM_BOT_TOKEN_2 && process.env.TELEGRAM_CHAT_ID_2 ? 
        fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN_2}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID_2, text: telegramMessage, parse_mode: 'HTML' }),
        }).catch(err => console.error("Robot 2 Error:", err)) : Promise.resolve()
    ]);

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook Internal Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
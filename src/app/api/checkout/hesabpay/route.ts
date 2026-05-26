import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { userId, serviceId, serviceName, quantity, link, amount, transactionInfo } = await req.json();

    // اتصال به سوپابیس با کلید سرویس‌رول برای دسترسی کامل
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // ۱. استخراج اطلاعات کاربر (نام، ایمیل، شماره) از جدول پروفایل
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('first_name, last_name, email, phone')
      .eq('id', userId)
      .single();

    const fullName = profileData ? `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || 'نامشخص' : 'نامشخص';
    const email = profileData?.email || 'نامشخص';
    const phone = profileData?.phone || 'نامشخص';

    // ۲. پیدا کردن آیدی ۴ رقمی سپلایر (Supplier ID) بر اساس آیدی داخلی سرویس
    const { data: serviceData, error: serviceError } = await supabase
      .from('smm_services')
      .select('supplier_service_id')
      .eq('id', parseInt(serviceId))
      .single();

    // اگر آیدی سپلایر پیدا نشد، از همان آیدی داخلی استفاده می‌کنیم یا پیام خطا می‌دهیم
    const finalSupplierId = serviceData?.supplier_service_id || "نامشخص";

    // ۳. ثبت در دیتابیس smm_orders با وضعیت انتظار برای تایید دستی
    const { error: dbError } = await supabase.from('smm_orders').insert({
      user_id: userId,
      service_id: parseInt(serviceId),
      link: link,
      quantity: parseInt(quantity),
      total_cost: parseFloat(amount),
      status: 'pending_manual_check',
      // ذخیره اطلاعات تراکنش در فیلد آیدی سپلایر به صورت موقت برای پیگیری شما
      supplier_order_id: `HP-${transactionInfo || 'PENDING'}` 
    });

    if (dbError) {
      console.error("Database Insert Error:", dbError.message);
      throw new Error("خطا در ثبت دیتابیس: " + dbError.message);
    }

    // ۴. آماده‌سازی پیام تلگرام با جزئیات کامل و قالب جدید
    const telegramMessage = `
🌟 <b>سلطان انلاین سرویس</b>
🏦 <b>حساب پی منول پیمنت (HesabPay Manual Payment)</b>
━━━━━━━━━━━━━━━━━━
👤 <b>اطلاعات کاربر:</b>
▪️ <b>نام:</b> ${fullName}
▪️ <b>ایمیل:</b> <code>${email}</code>
▪️ <b>شماره:</b> <code>${phone}</code>
▪️ <b>آیدی سیستم:</b> <code>${userId}</code>
━━━━━━━━━━━━━━━━━━
📦 <b>جزئیات سفارش:</b>
▪️ <b>سرویس:</b> <code>${serviceName}</code>
▪️ <b>آیدی سپلایر:</b> <code>${finalSupplierId}</code>
▪️ <b>تعداد:</b> <code>${quantity}</code>
▪️ <b>لینک:</b> ${link}
▪️ <b>مبلغ پرداختی:</b> <b>${amount} USD</b>
▪️ <b>یادداشت/کد پیگیری:</b> ${transactionInfo || 'بدون توضیحات'}
━━━━━━━━━━━━━━━━━━
✅ <b>دستورالعمل:</b>
ابتدا حساب‌پی خود را چک کنید. در صورت دریافت مبلغ، سفارش را با استفاده از آیدی سپلایر <code>${finalSupplierId}</code> به صورت دستی در پنل اصلی ثبت کنید.
`;

    // ۵. ارسال همزمان و موازی به هر دو ربات تلگرام
    await Promise.all([
      // ربات اول
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }).catch(err => console.error("HesabPay Robot 1 Error:", err)),

      // ربات دوم
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN_2}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID_2,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }).catch(err => console.error("HesabPay Robot 2 Error:", err))
    ]);

    return NextResponse.json({ 
      success: true, 
      message: "سفارش شما ثبت شد و در صف تایید مدیریت قرار گرفت." 
    });

  } catch (err: any) {
    console.error("Webhook Internal Error:", err.message);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 400 });
  }
}
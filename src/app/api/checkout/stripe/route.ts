import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    // دریافت تمام متغیرهای لازم از فرانت‌اند
    const { amount, userId, serviceId, link, quantity, serviceName } = await req.json();

    // بررسی اولیه برای جلوگیری از خطاهای بی‌مورد
    if (!amount || !serviceId) {
      return NextResponse.json({ success: false, error: "اطلاعات سفارش ناقص است." }, { status: 400 });
    }

    // استرایپ برای فیلدهای description و metadata محدودیت کاراکتر دارد
    // این دو خط از کرش کردن درگاه به خاطر لینک‌های بسیار طولانی جلوگیری می‌کنند
    const safeLink = link ? link.substring(0, 490) : 'nolink';
    const safeDescription = `Order for: ${link}`.substring(0, 250);
    
    // در صورتی که متغیر محیطی ست نشده باشد، از لینک اصلی سایت استفاده می‌کند
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.2xfollowers.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(amount * 100), // تبدیل دلار به سنت
          product_data: {
            name: serviceName || '2X Followers Service',
            description: safeDescription,
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      
      // بخش کلیدی: ارسال دیتای کامل به ویب‌هوک
      metadata: { 
        userId: String(userId || '0'), 
        serviceId: String(serviceId), 
        link: safeLink, 
        quantity: String(quantity) 
      },

      success_url: `${baseUrl}/dashboard?status=success`,
      cancel_url: `${baseUrl}/dashboard/new-order`,
    });

    // اینجا کلید حل مشکل است: ارسال success: true به همراه url
    return NextResponse.json({ success: true, url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err.message);
    // ارسال ارور با فرمت استاندارد برای فرانت‌اند
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
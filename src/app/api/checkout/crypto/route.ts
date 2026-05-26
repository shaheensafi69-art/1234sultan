import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, userId, serviceId, link, quantity, serviceName } = body;

    // بررسی اولیه برای جلوگیری از خطاهای بی‌مورد
    if (!amount || !serviceId) {
      return NextResponse.json({ success: false, error: "اطلاعات سفارش ناقص است." }, { status: 400 });
    }

    // کوتاه کردن لینک برای جلوگیری از خطای محدودیت طول کاراکتر در NowPayments
    const safeLink = link ? link.substring(0, 50).replace(/\//g, '|') : 'nolink';
    const customOrderId = `${userId || '0'}_${serviceId}_${quantity}_${safeLink}`;

    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: "usd",
        order_id: customOrderId, 
        order_description: `${serviceName} - ${link}`.substring(0, 100), // محدود کردن طول توضیحات
        ipn_callback_url: "https://www.2xfollowers.com/api/webhooks/crypto",
        success_url: "https://www.2xfollowers.com/dashboard?status=success",
        cancel_url: "https://www.2xfollowers.com/dashboard/new-order"
      }),
    });

    const data = await response.json();

    // بررسی دقیق پاسخ درگاه و ارسال success: true به فرانت‌اَند
    if (response.ok && data && data.invoice_url) {
      return NextResponse.json({ success: true, url: data.invoice_url }); 
    } else {
      console.error("NOWPayments API Error:", data);
      return NextResponse.json({ 
        success: false, 
        error: data.message || "خطا در ایجاد فاکتور کریپتو. لطفاً دوباره تلاش کنید." 
      }, { status: 400 });
    }
  } catch (err: any) {
    console.error("Crypto Route System Error:", err);
    return NextResponse.json({ success: false, error: "خطای ارتباط با سرور پرداخت." }, { status: 500 });
  }
}
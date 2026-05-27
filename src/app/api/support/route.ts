// src/app/api/support/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, imageUrl } = await req.json();

    const telegramMessage = `
📩 <b>تیکت پشتیبانی جدید</b>
━━━━━━━━━━━━━━━━━━
💬 <b>پیام کاربر:</b>
${message || 'بدون متن'}

🖼 <b>لینک تصویر / رسید:</b>
${imageUrl ? `<a href="${imageUrl}">مشاهده تصویر رسید</a>` : 'تصویری ارسال نشده است.'}
━━━━━━━━━━━━━━━━━━
`;

    // اگر عکس وجود داشت، متد sendPhoto تلگرام را صدا می‌زنیم
    if (imageUrl) {
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          photo: imageUrl,
          caption: telegramMessage,
          parse_mode: 'HTML',
        }),
      });
    } else {
      // اگر فقط متن بود، متد sendMessage را صدا می‌زنیم
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      });
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Support Webhook Error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const path = request.nextUrl.pathname;

  // ۱. اجازه عام و تام به تمام ویب‌هوک‌های پرداختی (Stripe و NOWPayments)
  // این مسیرها هرگز نباید بلاک شوند تا تراکنش‌ها در دیتابیس ثبت شوند
  if (path.startsWith('/api/webhooks') || path.startsWith('/api/integration')) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // دریافت وضعیت نشست کاربر
  const { data: { session } } = await supabase.auth.getSession()

  // ۲. اصلاح ریدایرکت صفحه اصلی (Sultan Online Service)
  // اگر کاربر صفحه اصلی را باز کرد، اگر لاگین بود برود داشبورد، وگرنه برود صفحه لاگین
  if (path === '/') {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // تعریف صفحات عمومی و صفحات احراز هویت
  const isPublicPage = path === '/services' || path.startsWith('/products');
  const isAuthPage = path === '/login' || path === '/signup' || path === '/forgot-password';

  // ۳. هدایت مشتری لاگین نشده به صفحه لاگین
  if (!session && !isPublicPage && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    // ذخیره آدرس فعلی برای اینکه بعد از لاگین مشتری دوباره به همینجا برگردد
    loginUrl.searchParams.set('next', path); 
    return NextResponse.redirect(loginUrl);
  }

  // اگر کاربر لاگین بود و خواست به صفحه لاگین برود، بفرستش به داشبورد اصلی سلطان
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * تطبیق تمام مسیرها به جز موارد استاتیک و ویب‌هوک‌ها
     */
    '/((?!_next/static|_next/image|api/webhooks|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const path = request.nextUrl.pathname;

  // ۱. ویب‌هوک‌ها و فایل‌های عمومی (بسیار حیاتی)
  if (path.startsWith('/api/webhooks') || path.startsWith('/api/integration') || path.startsWith('/api/support')) {
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

  // ۲. تعریف صفحات عمومی (صفحاتی که همه می‌توانند ببینند)
  // اضافه کردن '/' به این لیست باعث می‌شود اولین چیزی که کاربر می‌بیند صفحه اصلی باشد
  const publicPaths = ['/', '/services', '/contact', '/about', '/privacy', '/terms'];
  const isPublicPage = publicPaths.includes(path) || path.startsWith('/products');

  // ۳. تعریف صفحات احراز هویت
  const isAuthPage = path === '/login' || path === '/signup' || path === '/forgot-password';

  // ۴. منطق ریدایرکت هوشمند:
  
  // الف) اگر کاربر لاگین کرده و بخواهد به صفحه لاگین/ثبت‌نام برود -> بفرستش به داشبورد
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ب) اگر کاربر لاگین نکرده و بخواهد صفحات خصوصی (مثل داشبورد یا کیف پول) را ببیند
  // فقط در این حالت او را به لاگین می‌فرستیم
  if (!session && !isPublicPage && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', path); // ذخیره مسیر فعلی برای بازگشت بعد از لاگین
    return NextResponse.redirect(loginUrl);
  }

  // ج) در تمام موارد دیگر (مثلاً مشاهده صفحه اصلی یا سرویس‌ها در حالت لاگین نشده)
  // اجازه بده کاربر صفحه را ببیند
  return response
}

export const config = {
  matcher: [
    /*
     * تطبیق تمام مسیرها به جز موارد استاتیک
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
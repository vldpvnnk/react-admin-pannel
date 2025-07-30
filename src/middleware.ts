import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken) {
    // Редирект на главную, если токен отсутствует
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Всё ок — продолжаем
  return NextResponse.next();
}

// Указываем, на какие маршруты применять middleware
export const config = {
  matcher: ['/posts/:path*'], // 👈 Защищаем все маршруты, начинающиеся с /posts
};

import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');

  if (!access_token || !refresh_token) {
    return new NextResponse('Invalid token', { status: 400 });
  }

  const response = NextResponse.redirect(new URL('/posts', req.url));

  response.headers.set('Set-Cookie', [
    serialize('access_token', access_token, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24,
    }),
    serialize('refresh_token', refresh_token, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    }),
  ].join(', '));

  return response;
}

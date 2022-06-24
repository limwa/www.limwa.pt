import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (pathname !== '/gpg') {
    return NextResponse.next();
  }

  const res = NextResponse.rewrite(`${origin}/gpg/limwa.gpg`);
  res.headers.set('content-type', 'text/plain');

  return res;
}

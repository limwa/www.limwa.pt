import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (pathname !== '/cv') {
    return NextResponse.next();
  }

  const res = NextResponse.rewrite(`${origin}/cv/cv.txt`);
  res.headers.set('content-type', 'text/plain');

  return res;
}

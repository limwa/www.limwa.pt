import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname !== '/github') {
    return NextResponse.next();
  }

  return NextResponse.redirect('https://github.com/limwa');
}

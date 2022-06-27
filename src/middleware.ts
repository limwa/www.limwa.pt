import { NextRequest, NextResponse } from 'next/server';

type MiddlewareHandlers = Record<string, (origin: string) => NextResponse>;

const handlers: MiddlewareHandlers = {
  '/gpg': (origin) => {
    const res = NextResponse.rewrite(`${origin}/gpg/limwa.asc`);
    res.headers.set('content-type', 'text/plain; charset=utf-8');
    return res;
  },
  '/cv': (origin) => {
    const res = NextResponse.rewrite(`${origin}/cv/cv.txt`);
    res.headers.set('content-type', 'text/plain; charset=utf-8');
    return res;
  },
  '/github': () => {
    return NextResponse.redirect('https://github.com/limwa');
  },
};

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const handler = handlers[pathname];
  if (!handler) {
    return NextResponse.next();
  }

  return handler(origin);
}

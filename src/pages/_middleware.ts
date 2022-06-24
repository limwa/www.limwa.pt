import { NextRequest, NextResponse } from 'next/server';
import { type DetailMap } from '@/utils/details';

const detailAction = {
  redirect: (value: string) => NextResponse.redirect(value),
  text: (value: string) => new NextResponse(value),
};

let _details: Promise<DetailMap> | null = null;
async function getDetails(origin: string) {
  if (_details) {
    return _details;
  }

  _details = fetch(`${origin}/api/details`)
    .then((res) => res.json())
    .then<DetailMap>((res) => res.details)
    .then(Object.entries)
    .then((entries) => entries.map(([key, value]) => [`/${key}`, value]))
    .then<DetailMap>(Object.fromEntries);

  return await _details;
}

export async function middleware(req: NextRequest) {
  const detailsMap = await getDetails(req.nextUrl.origin);
  if (detailsMap) {
    const path = req.nextUrl.pathname;
    const detail = detailsMap[path];

    if (detail?.type) {
      return detailAction[detail.type](detail.value);
    }
  }

  return NextResponse.next();
}

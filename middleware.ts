import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const theme = request.cookies.get('theme');
  const {pathname} = request.nextUrl;
  // if (pathname == "/my-divar"){

  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  const response = NextResponse.next();

  if (!theme) {
    response.cookies.set('theme', 'dark');
  }



  return response;
}
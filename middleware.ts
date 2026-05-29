import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const theme = request.cookies.get('theme');

  const response = NextResponse.next();

  if (!theme) {
    response.cookies.set('theme', 'dark');
  }

  return response;
}
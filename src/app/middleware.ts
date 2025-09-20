import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(Request: NextRequest) {
 const token = await getToken({ req: Request });

 if (token) {
  return NextResponse.next();
 } else {
  return NextResponse.redirect('/signin');
 }
}

export const config = {
  matcher: ['/cart'],
}
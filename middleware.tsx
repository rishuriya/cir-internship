
import { NextRequest, NextResponse } from 'next/server';
import {SignJWT, jwtVerify} from 'jose';

export async function middleware(req: NextRequest,) {
  console.log("logs now");
  if(req.headers.get('authorisation')){
    let token = req.headers.get('authorisation')
    const secret = process.env.SECRET;
    token = token.split(" ")[1];
    const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
    if(payload){
      return NextResponse.next();
    }
  }
 
  req.nextUrl.searchParams.set('from', req.nextUrl.pathname)
  req.nextUrl.pathname = '/login'
  
  // const url = req.nextUrl.clone()
  // url.pathname = '/login'
  // return NextResponse.rewrite(url)
}

export const config = {
    matcher: ['/api/internship/:path*','/api/student/internship-form/:path*','/api/student/userdetails/:path*','/api/admin/admin_decision/:path*','/api/auth/signup/:path*']
};
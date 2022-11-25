
import { NextRequest, NextResponse } from 'next/server';
import {SignJWT, jwtVerify} from 'jose';

export async function middleware(req: NextRequest,) {
  
  const token = req.headers.get('authorisation');

  if(!token){
    return NextResponse.redirect(new URL('/api/notauthorised', req.url));
  }

  if(token && token.trim()!==""){
    let token = req.headers.get('authorisation')
    const secret = process.env.SECRET;
    token = token.split(" ")[1];
    const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
    if(payload){
      return NextResponse.next();
    }
  }
  
  return NextResponse.redirect(new URL('/api/notauthorised', req.url));

}

export const config = {
    matcher: ['/api/internship/:path*','/api/student/internship-form/:path*','/api/student/userdetails/:path*','/api/admin/admin_decision/:path*','/api/auth/signup/:path*']
};
import { NextResponse } from 'next/server'
import {SignJWT, jwtVerify} from 'jose';

export async function middleware(req) {
  // console.log("middleware working");

  req.isAuth=false
  req.user=null

  if(req.headers.get('authorisation')){
    // console.log(req.headers.get('authorisation'));
    let token = req.headers.get('authorisation')
    const secret = process.env.SECRET;
    token = token.split(" ")[1];
    const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
    if (!payload) {
      req.isAuth=false;
      req.user=null;
    };
    // console.log(payload.user);
        req.user = payload.user;
        req.isAuth = true;
  }

  // return next();
}



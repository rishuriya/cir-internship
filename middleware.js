import { NextResponse } from 'next/server'
import {SignJWT, jwtVerify} from 'jose';

export async function middleware(req) {
  // console.log("middleware working");
  const response = NextResponse.next()
  // response.headers.append({"isAuth":false});
  // req.headers.append("isAuth",false);
  // console.log("middleware working");
  // console.log(req);
    
  // req.isAuth=false
  // req.user=null
  // console.log(req.headers.get());
  if(req.headers.get('authorisation')){
    // console.log(req.headers.get('authorisation'));
    let token = req.headers.get('authorisation')
    const secret = process.env.SECRET;
    token = token.split(" ")[1];
    const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
    // console.log(payload);
    if (payload) {
      // req.user = payload.user;
      // req.isAuth = true;
      // response.headers.append({"isAuth":true});
      response.headers["user"]= payload.user
    };
  }

  // console.log("asdrewdcdf: ",response);
  // return response
}



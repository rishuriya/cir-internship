import { NextResponse } from 'next/server'
// const verify = require("jsonwebtoken").verify;
// import jwt from "jsonwebtoken";
// import userCheck from "./utils/userCheck";

export function middleware(req) {
  // console.log("middleware working");

  req.isAuth=false
  req.user=null

  if(req.headers.get('authorisation')){
    // // console.log(req.headers.get('authorisation'));
    // let token =req.headers.get('authorisation');
    // let decodedToken;
    // const secret = process.env.SECRET;
    // token = token.split(" ")[1];
    // decodedToken = jwt.verify(token, secret);
    
    // if (!decodedToken) {
    //   return response;
    // };

    //     req.user = decodedToken.user;
    //     req.isAuth = true;
  }

  // return next();
}



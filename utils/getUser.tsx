const verify = require("jsonwebtoken").verify;
import User from "../models/User";


export const getUser=async(token)=>{

    let decodedToken;
    const secret = "secret@123";
    const response={
        user:null,
        isAuth:false,
    }
    
    token = token.split(" ")[1];
    try{
        decodedToken = verify(token, secret);
    }catch(error){
        return response;
    }
   
    if (!decodedToken) {
        return response;   
    };

    response.user=decodedToken.user;
    response.isAuth=true;

   
    return response;
}
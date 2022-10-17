import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"
import bcrypt from "bcrypt"
import cookie from "js-cookie";
const  { compare } = bcrypt;
const {serializeUser,issueToken} = require('../../../utils/functions');

export default async function handeler(req,res) {
    const {method}=req;
    await db_connect();
    try{
        let {email,password} = req.body;
        let query={email:email}


        let user = await User.find(query)
        
        const match = await bcrypt.compare(password, user[0]['password']);
        if(!match){
            return res.json({success:false,message:'Incorrect Password'})
        }
        let result= user[0].toObject();
        result.id=result._id;
        cookie.set("id", result.id.valueOf(),{expires: 5});
        result=await serializeUser(result);
        let token = await issueToken(result);
        // console.log({success:true,message:'user created',user:result,token:token})
        return await res.status(200).json({success:true,message:'user created',user:result,token:token})
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
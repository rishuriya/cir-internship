import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"
import bcrypt from "bcrypt"
const  { hash, genSaltSync } = bcrypt;
const {serializeUser,issueToken} = require('../../../utils/functions');;

export default async function handeler(req,res) {
    
    db_connect();
    try{
        let {name,email,password} = req.body;

        const salt =  genSaltSync(10);
        const hashpassword= await hash(password,salt)
    
        req.body.password=hashpassword;

        let user = new User(req.body);
        if(!user){
            return res.status(400).json({success:false,message:'user not created'})
        }
        
        let result = await user.save();
        // console.log(result)
        if(!result){
            return res.status(400).json({success:false,message:'user not created'})
        }
        result= result.toObject();
        result.id=result._id;
        result=await serializeUser(result);
        let token = await issueToken(result);
        // console.log({success:true,message:'user created',user:result,token:token})
        return await res.status(200).json({success:true,message:'user created',user:result,token:token})
            
    }
    catch(error){
        return res.status(400).json({success:false,message:error.message})
    }
}
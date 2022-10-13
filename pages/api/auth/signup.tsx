import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"
import bcrypt from "bcrypt"
const  { hash, genSaltSync } = bcrypt;
const {serializeUser,issueToken} = require('../../../utils/functions');


export default async function handeler(req,res) {
    const {method}=req;
    db_connect();
    try{
        let {name,email,password} = req.body;
        //console.log(req.body);

        const salt = genSaltSync(10);
        const hashpassword= await hash(password,salt)
    
        req.body.password=hashpassword
        let user = new User(req.body);
        if(!user){
            return res.status(400).json({success:false,message:'user not created'})
        }

        let result = await user.save();
        result= result.toObject();
        result.id=result._id;
        result=await serializeUser(result);
        let token = await issueToken(result);
        
        res.status(200).json({success:true,message:'user created',user:user,token:token})
        if(user.role=='admin'){
            res.redirect('/admin')
        } else {
            res.redirect('/')
        }
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
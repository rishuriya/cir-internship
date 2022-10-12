import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"
import bcrypt from "bcrypt"
const  { hash, genSaltSync } = bcrypt;


export default async function handeler(req,res) {
    const {method}=req;
    db_connect();
    try{
        let {name,email,password} = req.body;
        console.log(req.body);

        const salt = genSaltSync(10);
        const hashpassword= await hash(password,salt)
    
        req.body.password=hashpassword
        let user = new User(req.body);
        await user.save();
        if(!user){
            return res.status(400).json({success:false,message:'user not created'})
        }
        //res.status(200).json({success:true,message:'user created',user:user})
        res.redirect("/")
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"
import bcryptjs from "bcryptjs"
const  { hash, genSaltSync } = bcryptjs;


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
            return res.json({success:false,message:'user not created'})
        }
        res.redirect("/")
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
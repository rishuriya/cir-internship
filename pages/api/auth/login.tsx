import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"
import bcrypt from "bcrypt"
const  { hash, genSaltSync } = bcrypt;


export default async function handeler(req,res) {
    const {method}=req;
    db_connect();
    try{
        let {email,password} = req.body;
        let query={email:email}
        let user = await User.find(query)
        
        const match = await bcrypt.compare(password, user[0]['password']);
        if(!match){
            return res.json({success:false,message:'Incorrect Password'})
        }
        res.redirect("/")
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
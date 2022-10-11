import db_connect from "../../utils/db_connect";
import User from "../../models/User"
import bcrypt from "bcryptjs"


export default async function handeler(req,res) {
    const {method}=req;
    db_connect();
    try{
        const Password=req.body["password"];
        const hashpassword= await bcrypt.hash(Password,12)
        //console.log()
        req.body["password"]=hashpassword
        const user = await User.create(req.body);
         res.redirect("/")
         if(!user){
            return res.json({code:'user not created'})
        }
    }
    catch(error){
        res.status(400).json({status:'not able to do'})
    }
}
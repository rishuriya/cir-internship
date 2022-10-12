import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"
import bcryptjs from "bcryptjs"
const  { hash, genSaltSync } = bcryptjs;


export default async function handeler(req,res) {
    const {method}=req;
    db_connect();
    try{
        let {email,password} = req.body;
        console.log(email,password);
        // let user= await User.findOne({email});
        // if (user) {
        //     throw ("User already exists");
        // }

        const salt = genSaltSync(10);
        const hashpassword= await hash(password,salt)
    
        req.body["password"]=hashpassword
        let user = new User(email,password);
        await user.save();
        res.redirect("/")
        if(!user){
            return res.json({code:'user not created'})
        }
    }
    catch(error){
        res.status(400).json({status:'not able to do'})
    }
}
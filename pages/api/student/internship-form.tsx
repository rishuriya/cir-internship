import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship"

export default async function handeler(req,res) {
    db_connect();
    try{
        console.log(req.body);
        let user = new Internship(req.body);
        if(!user){
            return res.status(400).json({success:false,message:'user not created'})
        }
        //console.log(req.body)
        let result = await user.save();
        //console.log(result)
        // if(!result){
        //     return res.status(400).json({success:false,message:'user not created'})
        // }
        // console.log({success:true,message:'user created',user:result,token:token})
        return await res.status(200).json({success:true,message:'user created',user:result})
            
    }
    catch(error){
        return res.status(400).json({success:false,message:error.message})
    }
}
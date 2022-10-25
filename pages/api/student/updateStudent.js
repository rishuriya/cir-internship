import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"

export default async function handeler(req,res) {
    await db_connect();
    try{
        let query={email:req.body.email};

        let user = await User.updateOne(query,req.body);
        return await res.status(200).json({success:true,message:'user found and updated',user:user});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
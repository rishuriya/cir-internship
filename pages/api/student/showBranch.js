import db_connect from "../../../utils/db_connect";
import Course from "../../../models/branch"

export default async function handeler(req,res) {
    await db_connect();
    try{
        
        let branch = await Course.find(req.body)
        return await res.status(200).json({success:true,message:'user found',branch:branch})
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
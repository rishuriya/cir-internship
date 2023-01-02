import db_connect from "../../../utils/db_connect";
import Course from "../../../models/course"
import Branch from "../../../models/branch"

export default async function handeler(req,res) {
    await db_connect();
    try{
        let query={school_name:req.body.school}

        let course = await Course.find(query)
        let branch = await Branch.find(query)
        return await res.status(200).json({success:true,message:'user found',course:course, branch:branch})
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
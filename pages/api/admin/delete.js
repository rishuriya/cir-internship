import db_connect from "../../../utils/db_connect";
import Branch from "../../../models/branch"
import Course from "../../../models/course"
import School from "../../../models/school"

export default async function handeler(req,res) {
    await db_connect();
    try{
        let branch = await Branch.deleteOne(req.body)
        let course = await Branch.find({course:req.body.course})
        if(course.length==0){
            let courseDel = await Course.deleteOne({course_name:req.body.course})
            let school = await Course.find({school_name:req.body.school_name})
            if(school.length==0){
                let schoolDel = await School.deleteOne({school_name:req.body.school_name})
            }
        }
        return await res.status(200).json({success:true,message:'user found',branch:branch})
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
        
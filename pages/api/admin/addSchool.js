import db_connect from "../../../utils/db_connect";
import School from "../../../models/branch";


export default async function handeler(req,res) {
    await db_connect();
    try{
        let school = new School(req.body);
           
        if(!school){
            return res.status(400).json({success:false,message:'School not created'})
        }

        let result = await school.save();

        return await res.status(200).json({success:true,message:'School Added',school:result})
            
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship"
import User from "../../../models/User"; 

export default async function allInternships(req,res) {
    await db_connect();
    try{
       let Internship_data = await Internship.find({});
       
       if (Internship_data.length>0){
           return await res.status(200).json({success:true,message:'Internship Fetched',data:Internship_data})
       }
       
       else{
            return await res.status(400).json({success:false,message:'data not found'})
        }
       
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
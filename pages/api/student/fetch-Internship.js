import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship"
import User from "../../../models/User"; 

export default async function fetchInternships(req,res) {
    await db_connect();
    try{
        let id=req.body.id;
        
       let Internship_data = await Internship.findById(id);
    //    console.log(Internship_data)    
       if (Internship_data){
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
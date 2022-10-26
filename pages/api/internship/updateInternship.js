import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship";
import User from "../../../models/User";

export default async function handeler(req,res) {
    await db_connect();
    try{
        const query={
            user:req.body.user,
     }
        let internship = new Internship.findByIdAndUpdate(req.body._id,req.body);
        if(!internship){
            return res.status(400).json({success:false,message:'Internship form not updated'})
        }

        let result = await internship.save();

        return await res.status(200).json({success:true,message:'Internship updated',internship:result})
            
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
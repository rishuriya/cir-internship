import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship"

export default async function handeler(req,res) {
    await db_connect();
    try{
       const query={
              user:req.body.user,
              _id:req.body._id
       }
       
        let Internship_data = await Internship.find(query);
        if (Internship_data.length>0){
            return await res.status(200).json({success:true,message:'data found',data:Internship_data[0]})
        }
        else
            {
                return await res.status(400).json({success:false,message:'data not found'})
            }
        
    }
    catch(error){
        return res.status(400).json({success:false,message:error.message})
    }
}
import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship"

export default async function handeler(req,res) {
    await db_connect();
    try{
        const { slug } = req.query;
       
        let Internship_data = await Internship.find(slug);

        if (Internship_data.length>0){
            return await res.status(200).json({success:true,message:'Internship data found',data:Internship_data[0]})
        }
        else{
            return await res.status(400).json({success:false,message:'data not found'})
        }        
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
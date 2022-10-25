import Internship from "../../../models/Internship";
import db_connect from "../../../utils/db_connect";


export default async function handeler(req,res) {
    await db_connect();
    try{
        let id = req.query.id;
        // console.log(id);
        // let Internship_data = await Internship.find({"_id":id});
        let Internship_data = await Internship.findById(id);

        // console.log("Internship:",Internship_data);
        if (Internship_data){
            return await res.status(200).json({success:true,message:'Internship data found',data:Internship_data})
        }
        else{
            return await res.status(400).json({success:false,message:'data not found'})
        }        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}
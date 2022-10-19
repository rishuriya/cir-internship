import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship"

export default async function handeler(req,res) {
    await db_connect();
    try{
        let query={_id:req.body._id}
        //console.log(query)
        //console.log(req.body)
        let user = await Internship.updateOne(query,req.body)
        return await res.status(200).json({success:true,message:'Data found',user:user})
    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
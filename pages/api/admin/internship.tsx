import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship"

export default async function handeler(req,res) {
    db_connect();
    try{
        //console.log(req.body);
        let Internship_data = Internship.find();
        if(!Internship_data){
            return res.status(400).json({success:false,message:'data not found'})
        }
        //console.log(req.body)
        
        //console.log(result)
        // if(!result){
        //     return res.status(400).json({success:false,message:'user not created'})
        // }
        // console.log({success:true,message:'user created',user:result,token:token})
        return await res.status(200).json({success:true,message:'Data fetched',Internship_data:Internship_data})
            
    }
    catch(error){
        return res.status(400).json({success:false,message:error.message})
    }
}
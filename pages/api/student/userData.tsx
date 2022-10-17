import db_connect from "../../../utils/db_connect";
import User from "../../../models/User"

export default async function handeler(req,res) {
    db_connect();
    try{
       const query={
              _id:req.body._id
       }
       
        let user_data = await User.find(query);
        //console.log(user_data.length);
        if (user_data.length>0){
            return await res.status(200).json({success:true,message:'data found',data:user_data[0]})
        }
        else
            {
                return await res.status(400).json({success:false,message:'data not found'})
            }
        //console.log(req.body)
        
        //console.log(result)
        // if(!result){
        //     return res.status(400).json({success:false,message:'user not created'})
        // }
        // console.log({success:true,message:'user created',user:result,token:token})
        //return await res.status(200).json({success:true,message:'Data fetched',Internship_data:Internship_data[0]})
            
    }
    catch(error){
        return res.status(400).json({success:false,message:error.message})
    }
}
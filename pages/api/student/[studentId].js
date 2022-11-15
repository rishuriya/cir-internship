import db_connect from "../../../utils/db_connect";
import User from "../../../models/User";

export default async function handeler(req, res) {

    await db_connect();
    try{
        // console.log("walla",req.isAuth);
        // if(req.isAuth){
        //     const id = req.query.studentId;
        //     let userID = await User.findById(req.user.id);
            
        //     // if(!userID){
        //     //     return await res.status(200).json({success:true,message:'User data found',data:user})
        //     // }
        //     // else{
        //     //     return await res.status(400).json({success:false,message:'data not found'})
        //     // }

        //     if(id===userID){
        //         return await res.status(200).json({success:true,message:'User data found',data:req.user})
        //     }else{
        //         return await res.status(400).json({success:false,message:'not authenticated'})
        //     }
        // }
        // else{
        //     return await res.status(400).json({success:false,message:'not authenticated'})
        // }
        const id = req.query.studentId;
        let user_data = await User.findById(id);
        if (user_data){
            return await res.status(200).json({success:true,message:'data found',data:user_data})
        }
        else{
            return await res.status(400).json({success:false,message:'Student data not found'})
        }

    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }

  }
  
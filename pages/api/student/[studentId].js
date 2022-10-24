import db_connect from "../../../utils/db_connect";
import User from "../../../models/User";

export default async function handeler(req, res) {

    await db_connect();
    try{
        const { slug } = req.query;
        let user_data = await User.find(slug);

        if (user_data.length>0){
            return await res.status(200).json({success:true,message:'data found',data:user_data[0]})
        }
        else{
            return await res.status(400).json({success:false,message:'Student data not found'})
        }

    }catch(err){
        return res.status(500).json({success:false,message:error.message})
    }

  }
  
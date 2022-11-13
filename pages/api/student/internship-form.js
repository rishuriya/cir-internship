import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship";
import User from "../../../models/User";

export default async function handeler(req,res) {
    await db_connect();
    try{
        //console.log(req.body);
        let internship = new Internship(req.body);

        if(req.isAuth){
            const id = req.query.studentId;
            let userID = await User.findById(req.user.id);
            
            // if(!userID){  
            //     return await res.status(200).json({success:true,message:'User data found',data:user})
            // }
            // else{
            //     return await res.status(400).json({success:false,message:'data not found'})
            // }

            if(id===userID){
                return await res.status(200).json({success:true,message:'User data found',data:req.user})
            }else{
                return await res.status(400).json({success:false,message:'not authenticated'})
            }
        }
        else{
            return await res.status(400).json({success:false,message:'not authenticated'})
        }
        
        if(!internship){
            return res.status(400).json({success:false,message:'Internship form not created'})
        }
        // store internship data in user
        const user = await User.findById(req.body.user);
        if(!user){
            return res.status(400).json({success:false,message:'User not found'})
        }
        await user.internships.push(internship._id);
        await user.save();
        // console.log(user)

        let result = await internship.save();

        console.log(result)
        
        return await res.status(200).json({success:true,message:'Form created',internship:result})
            
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
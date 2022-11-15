import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship";
import User from "../../../models/User";

export default async function handeler(req,res) {
    await db_connect();
    try{
        let internship = new Internship(req.body);
        // check if internship details is filled
        

        if(!internship){
            return res.status(400).json({success:false,message:'Internship form not created'})
        }

        const user = await User.findById(req.body.user);
        if(!user){
            return res.status(400).json({success:false,message:'User not found'})
        }

        await user.internships.push(internship._id);
        await user.save();

        let result = await internship.save();

        return await res.status(200).json({success:true,message:'Internship Added',internship:result})
            
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
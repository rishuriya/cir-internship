import db_connect from "../../../utils/db_connect";
import Internship from "../../../models/Internship";
import User from "../../../models/User";
import Approval from "../../../models/CompletedInternship";

export default async function handeler(req,res) {
    await db_connect();
    try{
        let certificate = new Approval(req.body);
        // console.log("erererere: ",res.headers.isauth);

        // if(!res.headers.isauth){
        //     return await res.status(401).json({success:false,message:'not authenticated'})
        // }
        if(!certificate){
            return res.status(400).json({success:false,message:'Internship form not created'})
        }
        // store internship data in user
        const user = await User.findById(req.body.user);
        if(!user){
            return res.status(400).json({success:false,message:'User not found'})
        }
        let query={_id:req.body.internship}
        //console.log(query)
        //console.log(req.body)
        let status = await Internship.updateOne(query,{approved:"Pending Verification"})
        // await user.internships.push(internship._id);
        // await user.save();
        // console.log(user)

        let result = await certificate.save();
        
        return await res.status(200).json({success:true,message:'Form created',approval:result})
            
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
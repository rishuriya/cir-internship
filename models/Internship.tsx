import mongoose from "mongoose";
 
const internshipSchema =new mongoose.Schema({
   user:{
       required:true,
       ref:'User',
       type:mongoose.Schema.Types.ObjectId,
   },
   gender:{
       type:String,
       required:true
   },
   school:{
       type:String,
       required:true
   },
   rollno:{
       type:String,
       required:true
   },
   course:{
       type:String,
       required:true
   },
  
   branch:{
       type:String,
       required:true
   },
   department:{
       type:String,
       required:true
   },
   semester:{
       type:Number,
       required:true
   },
   batch:{
       type:String,
       required:true
   },
   phone:{
       type:String,
       required:true
   },
   company_name:{
       type:String,
       required:true
   },
   company_location:{
       type:String,
       required:true
   },
   company_website:{
       type:String,
       required:false
   },
   company_person_name:{
       type:String,
       required:false
   },
   for_whomsoever_concern:{
       type:Boolean,
       required:false
   },
   company_address:{
       type:String,
       required:true
   },
   company_email:{
       type:String,
       required:true
   },
   company_mobile:{
       type:String,
       required:true
   },
   internship_start_date:{
       type:Date,
       required:true
   },
   internship_end_date:{
       type:Date,
       required:true
   },
   approved:{
       type:Boolean,
       default:false,
   }
})
 
const internshipDataRecords=mongoose.models.internshipDataRecords
 || mongoose.model("internshipDataRecords",internshipSchema)
 
export default internshipDataRecords;

import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  user: {
    required: true,
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_location: {
    type: String,
    required: true,
  },
  company_website: {
    type: String,
    required: false,
  },
  company_person_name: {
    type: String,
    required: false,
  },
  company_email: {
    type: String,
    required: true,
  },
  company_mobile: {
    type: String,
    required: true,
  },
  training_type: {
    type: String,
    required: true,
  },
  internship_start_date: {
    type: Date,
    required: true,
  },
  internship_end_date: {
    type: Date,
    required: true,
  },
  internship_mode: {
    type: String,
    required: true,
  },
  approved: {
    type:String,
    enum:["Incomplete","Pending","Approved","Disapproved","Pending Verification","Completed"],
    default:"Incomplete",
    required:true
  },
  certificate: {
    type: String,
    required: false,
  },
  request_letter: {
    type: String,
    required: false,
  },
  hod_letter: {
    type: String,
    required: false,
  },
  admin_remarks: {
    type: String,
    required: false,
  },
  member: {
    type: String,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
}); 

const internshipDataRecords =
  mongoose.models.internshipDataRecords ||
  mongoose.model("internshipDataRecords", internshipSchema);

export default internshipDataRecords;

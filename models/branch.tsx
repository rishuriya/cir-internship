import mongoose from "mongoose";
const branchSchema =new mongoose.Schema({
    school_name:{
        required: true,
        type: String,
    },
    course:{
        required: true,
        type: String,
    },
    branch:{
        type:String,
        required:true
    },
});

const branchRecords =
  mongoose.models.branchRecords ||
  mongoose.model("branchRecords", branchSchema);

export default branchRecords;
import mongoose from "mongoose";
const branchSchema =new mongoose.Schema({
    school_name:{
        required: true,
        ref: "schools",
        type: mongoose.Schema.Types.ObjectId,
    },
    course:{
        required: true,
        ref: "course",
        type: mongoose.Schema.Types.ObjectId,
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
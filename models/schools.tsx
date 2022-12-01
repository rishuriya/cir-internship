import mongoose from "mongoose";
const schoolSchema =new mongoose.Schema({
    school_name:{
        type:String,
        required:true
    },
});

const schoolRecords =
  mongoose.models.schoolRecords ||
  mongoose.model("schoolRecords", schoolSchema);

export default schoolRecords;
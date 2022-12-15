import mongoose from "mongoose";
const schoolSchema =new mongoose.Schema({
    school_name:{
        required: true,
        type: String,
    },
    
});

const schoolRecords =
  mongoose.models.schoolRecords ||
  mongoose.model("schoolRecords", schoolSchema);

export default schoolRecords;
import mongoose from "mongoose";
const courseSchema =new mongoose.Schema({
    school_name:{
        required: true,
        ref: "schools",
        type: mongoose.Schema.Types.ObjectId,
    },
    course:{
        type:String,
        required:true
    },
});

const courseRecords =
  mongoose.models.courseRecords ||
  mongoose.model("courseRecords", courseSchema);

export default courseRecords;
import mongoose from "mongoose";
const courseSchema =new mongoose.Schema({
    school_name:{
        required: true,
        type: String,
    },
    course_name:{
        required: true,
        type: String,
    },
    
});

const courseRecords =
  mongoose.models.courseRecords ||
  mongoose.model("courseRecords", courseSchema);

export default courseRecords;
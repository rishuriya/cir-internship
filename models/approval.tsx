import mongoose from "mongoose";

const approveSchema = new mongoose.Schema({
  user: {
    required: true,
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  internship: {
    required: true,
    ref: "internshipDataRecords",
    type: mongoose.Schema.Types.ObjectId,
  },
  completion_certificate: {
    type: String,
  },
  approval_date:{
    type:Date,
  },
  remarks:{
    type:String,
  }
});
const approveDataRecords =
  mongoose.models.approveDataRecords ||
  mongoose.model("approveDataRecords", approveSchema);

export default approveDataRecords;

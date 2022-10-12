import mongoose from "mongoose";

export interface User {
    username: string;
    password: string;
  }

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

export default (mongoose.models.User as mongoose.Model<User>) || mongoose.model('User', userSchema);
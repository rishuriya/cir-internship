import mongoose from "mongoose";

export interface User {
    name:string;
    username: string;
    password: string;
    role:string;
  }

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})

export default (mongoose.models.User as mongoose.Model<User>) || mongoose.model('User', userSchema);
import { truncate } from "fs";
import mongoose from "mongoose";

export interface User {
    name:string;
    username: string;
    password: string;
    role:string;
    gender:string;
    school:string;
    rollno:string;
    course:string;
    branch:string;
    department:string;
    semester:string;
    batch:string;
    phone:string;
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
    },
    gender:{
        type:String,
        required:false
    },
    school:{
        type:String,
        required:false
    },
    rollno:{
        type:String,
        required:false
    },
    course:{
        type:String,
        required:false
    },
    branch:{
        type:String,
        required:false
    },
    department:{
        type:String,
        required:false
    },
    semester:{
        type:Number,
        required:false
    },
    batch:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    }
})

export default (mongoose.models.User as mongoose.Model<User>) || mongoose.model('User', userSchema);
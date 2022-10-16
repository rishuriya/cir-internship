import { truncate } from "fs";
import mongoose from "mongoose";

export interface User {
    name:string;
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
    year_of_joining:number;
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
        enum:["Student","Admin"],
        default:"Student",
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
    semester:{
        type:Number,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    year_of_joining:{
        type:Number,
        required:false
    }
})

export default (mongoose.models.User as mongoose.Model<User>) || mongoose.model('User', userSchema);
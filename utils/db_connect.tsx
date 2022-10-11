import mongoose from "mongoose";

const url=process.env.MONGODB_URL

if(!url){
    throw new Error(

    )
}

let cached =global.mongoose
if(!cached){
    cached=global.mongoose= {
        conn: null,
        promise: null
    }
}

async function db_connect(){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts={
            bufferCommands:false,
        }
        cached.promise=mongoose.connect(url,opts).then((mongoose)=>{
            return mongoose
        })
    }

    cached.conn= await cached.promise
    return cached.conn
}
export default db_connect
import mongoose, { mongo } from "mongoose";


const MONGO_URI = process.env.MONGO

if(!MONGO_URI){
    throw new Error("please define mongodb secret in the env file")
}


async function connectToDatabase(){
    if(mongoose.connection.readyState === 1){
        return mongoose;
    }
    const opts = {
        bufferCommands: false,
    }
    await mongoose.connect(MONGO_URI!, opts)
    return mongoose;
}




export default connectToDatabase
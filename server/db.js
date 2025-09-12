import mongoose from "mongoose";


export const connectDB=async (mongoURI)=>{
    try{
        await mongoose.connect(mongoURI,{});
        console.log("mongodb is connected")
    }
    catch(err){
        console.error("❌ MongoDB connection error:",err.message)
        throw err


    }
}

export default connectDB
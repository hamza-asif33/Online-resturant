import mongoose, { model } from "mongoose";
 const menuSchema=new mongoose.Schema({
 name:{type:String,required:true},
 description:{type:String},
  price: { type: Number, required: true },
  category: { type: String, enum: ["starter", "main", "dessert", "drink"], required: true },
  available: { type: Boolean, default: true },
 })

 export default mongoose.model("Menu",menuSchema)

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "preparing", "ready", "delivered", "cancelled"], 
    default: "pending"
  }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;

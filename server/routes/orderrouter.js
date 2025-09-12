import express from "express";
import {
  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/ordercontrollers.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();


router.post("/", protect(["customer"]), createOrder);


router.get("/", protect(["admin"]), getOrders);


router.get("/user", protect(["customer"]), getUserOrders);





router.patch("/:id/cancel", protect(["customer"]), cancelOrder);

export default router;

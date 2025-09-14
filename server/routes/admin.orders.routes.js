import express from "express";
import { getAllOrders, updateOrderStatus } from "../controllers/admin.orders.controller.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();


router.get("/", protect(["admin"]), getAllOrders);
router.patch("/:id/status", protect(["admin"]), updateOrderStatus);

export default router;

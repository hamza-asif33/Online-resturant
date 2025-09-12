import express from "express";
import {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menucontrollers.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();

// Public routes (frontend calls this)
router.get("/", getMenuItems);       // optional, just in case
router.get("/items", getMenuItems);  // frontend uses this

// Admin-only routes
router.post("/", protect(["admin", "owner"]), addMenuItem);
router.put("/:id", protect(["admin", "owner"]), updateMenuItem);
router.delete("/:id", protect(["admin", "owner"]), deleteMenuItem);

export default router;

import express from "express";
import {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menucontrollers.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();


router.get("/", getMenuItems);       
router.get("/items", getMenuItems);  


router.post("/", protect(["admin", "owner"]), addMenuItem);
router.put("/:id", protect(["admin", "owner"]), updateMenuItem);
router.delete("/:id", protect(["admin", "owner"]), deleteMenuItem);

export default router;

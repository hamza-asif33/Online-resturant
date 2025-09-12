import express from "express";
import { getAdminStats } from "../controllers/admin.stats.controller.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();

// Admin-only
router.get("/", protect(["admin"]), getAdminStats);

export default router;

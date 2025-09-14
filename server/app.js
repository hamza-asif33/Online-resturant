import express from "express";
import authrouter from "./routes/authrouter.js";
import menurouter from "./routes/menurouter.js";
import orderrouter from "./routes/orderrouter.js";
import adminOrdersRoutes from "./routes/admin.orders.routes.js";
import adminStatsRoutes from "./routes/admin.stats.routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authrouter);
app.use("/api/menu", menurouter);  
app.use("/api/orders", orderrouter);
app.use("/api/admin/orders", adminOrdersRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/equipment", equipmentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

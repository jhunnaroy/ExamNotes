import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utills/db.js";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start server AFTER DB
const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 9000, () => {
    console.log(` Server running on http://localhost:${process.env.PORT || 9000}`);
  });
};

startServer();
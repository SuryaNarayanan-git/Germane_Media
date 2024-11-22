const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://suryabhoopendranath:Suryanarayanan1@cluster0.uhfsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/rewards", rewardRoutes);
app.use("/users", userRoutes);

module.exports = app;

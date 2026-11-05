
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database connection
const connectDB = require("./config/db");

// Routes
const donorRoutes = require("./routes/donorRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// API Routes
app.use("/api/donors", donorRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);
app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Blood Donor Connect Backend is Running!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

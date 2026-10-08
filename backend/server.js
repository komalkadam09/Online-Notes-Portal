const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Admin routes
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Online Notes Portal Backend is running!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
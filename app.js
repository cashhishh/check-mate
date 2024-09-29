require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/list");

const app = express();
const allowedOrigins = [
  "https://teal-kleicha-62f340.netlify.app",
  "http://localhost:5173",
];

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use("/api/v1", authRoutes);
app.use("/api/v2", todoRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 1000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

startServer();

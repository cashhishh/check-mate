require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI; // Ensure this matches your .env
    if (!dbURI) {
      throw new Error("Database URI is not defined in environment variables.");
    }
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v2", taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

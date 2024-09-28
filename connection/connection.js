require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
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

module.exports = connectDB;

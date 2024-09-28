require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/list");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(
  cors({
    origin: "https://teal-kleicha-62f340.netlify.app/",
  })
);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

<<<<<<< HEAD
=======
app.use(
  cors({
    origin: "https://teal-kleicha-62f340.netlify.app/",
  })
);
app.use(express.json());

>>>>>>> 63cba0fa66cc43878b45b70f784225cae607d162
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB URI:", process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.use("/api/v2", todoRoutes);
    app.use("/api/v1", authRoutes);

    const PORT = process.env.PORT || 1000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

startServer();

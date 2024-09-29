const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register
// Register
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  // console.log("Received registration data:", req.body); // Log incoming data

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ email, username, password });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

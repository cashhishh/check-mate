const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  // Validate inputs
  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if username has spaces
  if (/\s/.test(username)) {
    return res.status(400).json({ message: "Username cannot have spaces" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }
);

module.exports = router;

// routes/auth.js
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Signup Route
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Error signing up" });
  }
});

// Signin Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Please Sign Up first" });
    }
    const isPassCorrect = bcrypt.compareSync(password, user.password);
    if (!isPassCorrect) {
      return res.status(400).json({ message: "Password Incorrect" });
    }
    const { password: _, ...others } = user._doc;
    return res.status(200).json({ user: others });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Invalid credentials" });
  }
});

module.exports = router;

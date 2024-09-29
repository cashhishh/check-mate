const express = require("express");
const List = require("../models/List");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

// Middleware to authenticate JWT
router.use(authenticate);

// Add Task
router.post("/addTask", async (req, res) => {
  const { title, body } = req.body;
  const userId = req.userId;

  if (!title || !body) {
    return res.status(400).json({ message: "Title and body are required." });
  }

  try {
    const newTask = new List({ title, body, userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Tasks
router.get("/allTasks", async (req, res) => {
  try {
    const tasks = await List.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Task
router.put("/updateTask/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body, completed } = req.body;

  try {
    const task = await List.findByIdAndUpdate(
      id,
      { title, body, completed },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Task
router.delete("/deleteTask/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await List.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

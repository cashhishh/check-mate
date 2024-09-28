const Task = require("../models/list");
const User = require("../models/user");

const addTaskHandler = async (req, res) => {
  const { title, body, userId } = req.body;
  try {
    const newTask = await Task.create({
      title,
      body,
      userId,
      completed: false,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTaskHandler = async (req, res) => {
  const { title, body } = req.body;
  const taskId = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, body },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTaskHandler = async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTasksHandler = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};
module.exports = {
  addTaskHandler,
  getAllTasksHandler,
  updateTaskHandler,
  deleteTaskHandler,
};

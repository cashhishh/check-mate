const router = require("express").Router();
const {
  addTaskHandler,
  getAllTasksHandler,
  updateTaskHandler,
  deleteTaskHandler,
} = require("../controllers/taskControllers");

// Create a new task
router.post("/addTask", addTaskHandler);

// Get all tasks for a user
router.get("/allTasks/:userId", getAllTasksHandler);

// Update an existing task
router.put("/updateTask/:id", updateTaskHandler);

// Delete a task
router.delete("/deleteTask/:id", deleteTaskHandler);

// Export the router
module.exports = router;

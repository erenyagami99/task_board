const asyncHandler = require("express-async-handler");
const Task = require("../model/task");
const User = require("../model/user");

const createTask = asyncHandler(async (req, res) => {
  const { name, description, dueDate, stage, userId } = req.body;
  if (!name || !description || !dueDate || !userId) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const task = await Task.create({
      name,
      description,
      dueDate,
      stage,
      userId,
    });
    res.status(200).json(task);
    console.log(task, "task");
  } catch (error) {
    res.status(400).json({ message: error.message });
    if (error.message.includes("E11000")) {
      throw new Error("Task Name Already Exists");
    }
  }
});

const getTasksOfUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ userId: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Task.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Task.findByIdAndDelete(id);
    console.log(data, "data");
    res.send(`Task with name: ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { createTask, getTasksOfUser, updateTask, deleteTask };

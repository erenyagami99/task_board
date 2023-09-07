const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const Stage = require("../model/task");

const createStage = asyncHandler(async (req, res) => {
  const { stageName, tasks, userId } = req.body;
  if (!stageName || !userId || !tasks) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const stage = await Stage.create({
      stageName,
      userId,
      tasks,
    });
    res.status(200).json(stage);
    console.log(stage, "stage");
  } catch (error) {
    res.status(400).json({ message: error.message });
    if (error.message.includes("E11000")) {
      throw new Error("Stage Name Already Exists");
    }
  }
});

const getStagesOfUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const stages = await Stage.find({ userId: userId });
    res.json(stages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateStage = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Stage.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateTaskInStage = async (req, res) => {
  const { stageId, taskId } = req.params;
  const updatedTaskData = req.body;

  try {
    const stage = await Stage.findById(stageId);

    if (!stage) {
      return res.status(404).json({ message: "Stage not found" });
    }

    const taskToUpdate = stage.tasks.find(
      (task) => task._id.toString() === taskId
    );

    if (!taskToUpdate) {
      return res.status(404).json({ message: "Task not found in the stage" });
    }
    Object.assign(taskToUpdate, updatedTaskData);
    await stage.save();

    res.status(200).json(taskToUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStage = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Stage.findByIdAndDelete(id);
    console.log(data, "data");
    res.send(`Stage with name: ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteTaskInStage = async (req, res) => {
  const { stageId, taskId } = req.params;

  try {
    const stage = await Stage.findById(stageId);

    if (!stage) {
      return res.status(404).json({ message: "Stage not found" });
    }

    const taskIndex = stage.tasks.findIndex((task) => task._id == taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found in the stage" });
    }

    stage.tasks.splice(taskIndex, 1);
    await stage.save();

    res.status(200).json({ message: "Task deleted from the stage" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStage,
  getStagesOfUser,
  updateStage,
  deleteStage,
  updateTaskInStage,
  deleteTaskInStage,
};

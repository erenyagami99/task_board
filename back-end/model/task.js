const mongoose = require("mongoose");

// Define the Task schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  application: {
    type: [],
  },
  links: {
    type: [],
  },
  assignee: {
    type: String,
    required: true,
  },
});

const stageSchema = new mongoose.Schema({
  stageName: {
    type: String,
    required: true,
    unique: true,
  },
  tasks: {
    type: [taskSchema],
    validate: {
      validator: function (tasks) {
        return tasks && tasks.length > 0;
      },
      message: "At least one task must be provided.",
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Stage = mongoose.model("Stage", stageSchema);

module.exports = Stage;

const { Router } = require("express");

const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userController");

const {
  createTask,
  updateTask,
  getTasksOfUser,
  deleteTask,
} = require("../controllers/taskController");

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user", currentUser);

router.post("/task", createTask);
router.get("/task/:userId", getTasksOfUser);
router.put("/task/:id", updateTask);

router.delete("/task/:id", deleteTask);

module.exports = router;

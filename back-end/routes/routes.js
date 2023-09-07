const { Router } = require("express");

const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userController");

const {
  createStage,
  updateStage,
  getStagesOfUser,
  deleteStage,
  updateTaskInStage,
  deleteTaskInStage,
} = require("../controllers/taskController");

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user", currentUser);

router.post("/task", createStage);
router.get("/task/:userId", getStagesOfUser);
router.put("/task/:id", updateStage);
router.put("/task/:stageId/:taskId", updateTaskInStage);
router.delete("/task/:id", deleteStage);
router.delete("/task/:stageId/:taskId", deleteTaskInStage);

module.exports = router;

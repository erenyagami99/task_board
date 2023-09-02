const { Router } = require("express");

const { registerUser, currentUser } = require("../controllers/userController");

const router = Router();

router.post("/register", registerUser);

router.post("/login", async (req, res) => {
  res.send("login user");
});

router.get("/user", currentUser);

module.exports = router;

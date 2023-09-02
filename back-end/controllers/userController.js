const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const { MongoServerError } = require("mongodb");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  try {
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const { _id } = await user.toJSON();

    const token = jwt.sign({ _id: _id }, process.env.SECRET_KEY);

    res.status(200).json({ user, token });
    console.log(user, "user");
  } catch (error) {
    if (error.message.includes("E11000")) {
      res.status(400).json({ message: "Email Already Exists" });
    }
    res.status(400).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {});

const currentUser = asyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, process.env.SECRET_KEY);

    if (!claims) {
      return res.status(401).send({
        message: "unathenticated",
      });
    }

    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = await user.toJSON();

    res.send(data);
  } catch (err) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
});

module.exports = { registerUser, currentUser };

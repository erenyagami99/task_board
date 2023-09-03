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

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({
      message: "User not Found",
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "Password is Incorrect",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

  res.status(200).json({ user, token });
  console.log(user, "user");
});

const currentUser = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET_KEY
    );

    if (!decodedToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({ _id: decodedToken._id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { password, ...data } = await user.toJSON();

    res.status(200).json(data);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

module.exports = { registerUser, currentUser, loginUser };

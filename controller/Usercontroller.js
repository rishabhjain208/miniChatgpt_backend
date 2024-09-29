const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Question = require("../models/question");

module.exports.createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const already_user = await User.findOne({ email });

    if (already_user) {
      return res
        .status(40398)
        .json({ success: false, message: "User already registered !" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        email: req.body.email,
        password: hash,
      });
      const saved_user = await newUser.save();
      const token = jwt.sign({ id: saved_user._id }, process.env.JWT_SECRET);
      return res.status(200).json({
        success: true,
        message: "Successfull created",
        newUser,
        token,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Some error", error });
  }
};
module.exports.getUserById = async (req, res) => {
  try {
    const userid = req.params.userid;
    const user = await User.findById({ _id: userid });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found !" });
    }
    return res.status(200).json({ success: true, msg: "user Found", user });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Some error", error });
  }
};
module.exports.getQuestionsByUserId = async (req, res) => {
  try {
    // Extract userId from the request parameters
    const userId = req.params.userId;

    // Find questions by userId
    const questions = await Question.find({ userId: userId });

    // Check if any questions were found
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No questions found for this user" });
    }

    // Return the found questions
    return res.status(200).json({ success: true, questions });
  } catch (error) {
    // Handle any errors
    return res.status(400).json({
      success: false,
      message: "An error occurred while retrieving questions",
      error,
    });
  }
};
module.exports.Allquestions = async (req, res) => {
  try {
    const userId = req.params.userid;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found !" });
    }
    const questions = await Question.find({ userId: userId });
    return res
      .status(200)
      .json({ success: true, message: "all question", questions });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Some error", error });
  }
};

module.exports.getUserByToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, userId: user._id });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid token", error });
  }
};

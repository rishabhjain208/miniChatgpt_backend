const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const email = req.body.email;
    const already_user = await User.findOne({ email });

    if (already_user) {
      return res
        .status(403)
        .json({ success: false, message: "User already registered !" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hash,
    });
    const saved_user = await newUser.save();
    const token = jwt.sign({ id: saved_user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ success: true, message: "Successfull created", newUser, token });
  } catch (error) {
    console.log("error")
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Some error", error });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }
    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      return res
        .status(403)
        .json({ success: false, message: "Password is Incorrect!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ success: true, message: "Login Successfull !", token });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Some error", error });
  }
};

module.exports.loginusername = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded_value = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded_value) {
      req.userID = decoded_value.id;
      console.log("User authenticated successfully");
    } else {
      res.status(403).json({ msg: "You are not authenticated" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Incorrect inputs",
    });
  }
  const user = await User.findOne({ _id: req.userID });
  res.status(200).json({
    email: user.email,
  });
};

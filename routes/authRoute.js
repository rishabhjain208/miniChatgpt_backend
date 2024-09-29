const express = require("express");
const {
  login,
  register,
  loginusername,
} = require("../controller/AuthController.js");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/loginusername/:token", loginusername);
module.exports = router;

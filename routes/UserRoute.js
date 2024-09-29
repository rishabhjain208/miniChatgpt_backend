const express = require("express");
const {
  Allquestions,
  createUser,
  getUserById,
  getUserByToken,
  getQuestionsByUserId,
} = require("./../controller/Usercontroller.js");
const { auth_middleware } = require("../middleware/verify.js");

const router = express.Router();
router.post("/", createUser);
router.get("/me", getUserByToken);
// router.get("/:userid", getUserById);
router.get("/:userId", getQuestionsByUserId);
router.get("/:userid/questions", auth_middleware, Allquestions);

module.exports = router;

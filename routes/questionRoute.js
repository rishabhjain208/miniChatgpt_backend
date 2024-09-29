const express = require("express");
const {
  askQuestion,
  getQuestion,
  getQuesByToken,
  getQuestionIdsByUserId,
} = require("../controller/QuestionController.js");
const { auth_middleware } = require("./../middleware/verify.js");
const router = express.Router();
// router.get("/ques", getQuesByToken);
router.post("/",auth_middleware, askQuestion);
router.get("/:questionId", auth_middleware, getQuestion);
router.get("/ids/user/:userId", getQuestionIdsByUserId);

module.exports = router;

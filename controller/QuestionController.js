const Question = require("../models/question.js");
const { ansByOpenAi } = require("./OpenAI.js");

module.exports.askQuestion = async (req, res) => {
  try {
    const question = req.body.question;
    const userId = req.userID;
    const answer = await ansByOpenAi(question);
    const newQuestion = new Question({
      question,
      userId,
      answer,
    });
    // console.log("answer", answer);
    const saved_Ques = await newQuestion.save();

    return res
      .status(200)
      .json({ success: true, msg: "question saved", saved_Ques });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "some error", error: error });
  }
};
module.exports.getQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    // Find the question by ID
    const question = await Question.findById(questionId);

    // Check if the question exists
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    // Return the question if found
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    // Handle any errors
    return res.status(400).json({
      success: false,
      message: "An error occurred while retrieving the question",
      error,
    });
  }
};

module.exports.getQuestionIdsByUserId = async (req, res) => {
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

    // Extract question IDs
    const questionIds = questions.map((ques) => ques._id);

    // Return the question IDs
    return res.status(200).json({ success: true, questionIds });
  } catch (error) {
    // Handle any errors
    return res.status(400).json({
      success: false,
      message: "An error occurred while retrieving question IDs",
      error,
    });
  }
};

// const Question = require("../models/question.js");
// const { ansByOpenAi } = require("./OpenAI.js");

// // Function to structure the answer
// const formatAnswer = (answer) => {
//   const splitAnswer = answer.split("\n");

//   return `
// ### Introduction
// ${splitAnswer[0]}

// ### Key Features
// ${splitAnswer[1]}

// ### Use Cases
// ${splitAnswer[2]}

// ### Benefits
// ${splitAnswer[3]}

// ### Drawbacks
// ${splitAnswer[4]}

// ### Conclusion
// ${splitAnswer[5]}
//   `;
// };

// // Controller to Handle Question Submission
// module.exports.askQuestion = async (req, res) => {
//   try {
//     const { question } = req.body;
//     const userId = req.userID;

//     // Generate an answer using OpenAI
//     let answer = await ansByOpenAi(question);

//     answer = formatAnswer(answer);
//     // Create a new question document
//     console.log(answer);
//     const newQuestion = new Question({
//       question,
//       userId,
//       answer,
//     });

//     // Save the question to the database
//     const savedQuestion = await newQuestion.save();

//     // Return a success response
//     return res.status(200).json({
//       success: true,
//       message: "Question saved successfully",
//       question: savedQuestion,
//     });
//   } catch (error) {
//     // Handle any errors
//     console.log(error);
//     return res.status(400).json({
//       success: false,
//       message: "An error occurred while saving the question",
//       error,
//     });
//   }
// };

// // Controller to Retrieve a Question by ID
// module.exports.getQuestion = async (req, res) => {
//   try {
//     const { questionId } = req.params;

//     // Find the question by ID
//     const question = await Question.findById(questionId);

//     // Check if the question exists
//     if (!question) {
//       return res.status(404).json({
//         success: false,
//         message: "Invalid question ID",
//       });
//     }

//     // Return the question if found
//     return res.status(200).json({
//       success: true,
//       question,
//     });
//   } catch (error) {
//     // Handle any errors
//     return res.status(400).json({
//       success: false,
//       message: "An error occurred while retrieving the question",
//       error,
//     });
//   }
// };

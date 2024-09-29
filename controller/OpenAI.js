const axios = require("axios");

module.exports.ansByOpenAi = async (question) => {
  const options = {
    method: "POST",
    url: "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2",
    headers: {
      'x-rapidapi-key': '96fc290c14mshdfa4f5da667db68p14ec6fjsndc5b6ac927dc',
    'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
    'Content-Type': 'application/json',
    },
    data: {
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    },
  };
  try {
    const response = await axios.request(options);
    const answer = response.data.result;
  
    return answer;
  } catch (error) {
    console.log(error)
    console.error(
      "Error from OpenAI API:",
      error.response ? error.response.data : error.message
    );
    return error;
  }
};
// const axios = require("axios");

// module.exports.ansByOpenAi = async (question) => {
//   const options = {
//     method: "POST",
//     url: "https://open-ai21.p.rapidapi.com/conversationpalm2",
//     headers: {
//       "x-rapidapi-key": "c0574a1845mshefa879807b9452dp1ed2abjsnfe974428f0fc",
//       "x-rapidapi-host": "open-ai21.p.rapidapi.com",
//       "Content-Type": "application/json",
//     },
//     data: {
//       messages: [
//         {
//           role: "user",
//           content: question,
//         },
//       ],
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     const answer = response.data.BOT;
//     console.log(answer);
//     return answer;
//   } catch (error) {
//     console.error(
//       "Error from OpenAI API:",
//       error.response ? error.response.data : error.message
//     );
//     return "An error occurred while fetching the answer.";
//   }
// };

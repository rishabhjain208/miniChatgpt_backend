const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/authRoute.js");
const questionRoute = require("./routes/questionRoute.js");
const userRoute = require("./routes/UserRoute.js");

dotenv.config();
const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  return res.send("working");
});
mongoose.set("strictQuery", false);
const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/questions", questionRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  Connect();
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;

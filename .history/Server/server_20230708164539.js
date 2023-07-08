const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully Connected");
    }
  }
);
// Import Routes

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

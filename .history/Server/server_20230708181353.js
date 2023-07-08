const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const mongoose = require("mongoose");

await mongoose.connect(
  process.env.MONGODB,

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

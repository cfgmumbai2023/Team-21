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

mongoose.connect(process.env.MONGODB);
// Import Routes

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

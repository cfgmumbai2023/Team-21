const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Import Routes

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

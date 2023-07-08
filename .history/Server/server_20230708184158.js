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

mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error : " + err);
});

async function mongoconnect() {
  await mongo.connect(MONGODB);
}
await function connect() {
  mongoconnect();
};
// Import Routes

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

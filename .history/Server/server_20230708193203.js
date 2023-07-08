const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoute = require("./routes/user.routes");
const courseRoute = require("./routes/course.routes");
const cloudRoute = require("./routes/cloudinary.routes");
const cloudinary = require("cloudinary").v2;
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
  await mongoose.connect(process.env.MONGODB);
}

mongoconnect();
// Import Routes

app.use("/course", courseRoute);
app.use("/user", userRoute);
app.use("/cloduinary", cloudRoute);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

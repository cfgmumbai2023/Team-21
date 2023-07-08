const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

router.route("/uploadImages").get(async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://www.istockphoto.com/photos/india",
      (folder: "sports")
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }

  res.send("hello world");
});
//   .patch((err) => {
//     console.log(err);
//   });

module.exports = router;

const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/uploadImages").get(async (req, res) => {
  res.send("Hello world");
  // cloudinary.uploader
  //   .upload("https://www.istockphoto.com/photos/india", {
  //     resource_type: "image",
  //   })
  //   .then((result) => {
  //     res.send(result);
  //   });
});
//   .patch((err) => {
//     console.log(err);
//   });

module.exports = router;

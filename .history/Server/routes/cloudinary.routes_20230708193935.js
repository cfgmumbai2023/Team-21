const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router
  .route("/uploadImages")
  .post(async (req, res) => {
    cloudinary.uploader
      .upload("https://www.istockphoto.com/photos/india", {
        resource_type: "image",
      })
      .then((result) => {
        console.log(result, JSON.stringify(result));
      });
  })
  .catch((err) => {
    console.log(err);
  });
export default router;

const express = require("express");
const Course = require("../models/courseModels");
const User = require("../models/userModels");
const router = express.Router();

router.route("/upload").post(async (req, res) => {
  try {
    /*
    req.body = {
      id: user_id,
      title: coourseTitle,
      sport,
      minCertificateLevel,
      contents: [
        {
          title: String,
          link: String,
        }
      ]
    }
    */
    // const user = await User.findOne({ _id: req.body.id });
    // let found_ = false;
    // user.certificate.forEach((certificate) => {
    //   if (certificate.sport === req.body.sport) {
    //     if (certificate.level !== "pro") {
    //       return res.status(400).json({
    //         success: false,
    //         message: "Only Pro certificate holder can create courses",
    //       });
    //     }
    //   }
    // });
    // if (!found_) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Only Pro certificate holder can create courses",
    //   });
    // }
    let course = {
      title: req.body.title,
      sport: req.body.sport,
      minCertificateLevel: req.body.gradingLevel,
      contents: [
        {
          title: "Hello",
          link: "https://www.youtube.com/watch?v=QwievZ1Tx-8",
        },
      ],
      // createdBy: req.body.id,
    };
    await Course.create(course);
    return res.status(200).json({
      success: true,
      message: "Course Created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

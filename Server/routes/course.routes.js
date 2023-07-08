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
    const user = await User.findOne({ _id: req.body.id});
    let found_ = false; 
    user.certificate.forEach((certificate)=> {
      if(certificate.sport === req.body.sport){
        if(certificate.level !== "pro"){
          return res.status(400).json({
            success: false,
            message: "Only Pro certificate holder can create courses"
          })
        }
      }
    });
    if(!found_){
      return res.status(400).json({
        success: false,
        message: "Only Pro certificate holder can create courses",
      })
    }
    let course = { title: req.body.title, sport: req.body.sport, minCertificateLevel: req.body.minCertificateLevel, contents: req.body.contents, createdBy: req.body.id};
    await Course.create(course);
    return res.status(200).json({
      success: true,
      message: "Course Created successfully"
    })
  }
  catch(err){
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
});

//For registring User to a course
router.route("/register/:id").post(async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });
  const user = await User.findOne({ _id: req.body.userid });
  user.coursesTaken.push(course._id);
  await user.save();
  res.status(200).json({
    success: true,
    message: "User Registered to the course",
  });
});

//For getting single course
router.route("/:id").get(async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    course,
  });
});

//For getting all courses
router.route("/allcourses").get(async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({
    success: true,
    courses,
  });
});

router.route("/filteredCourses/:id").get(async (req, res) => {
  const courses = await Course.find({});
  const user = await User.findOne({ _id: req.params.id });
  const arr = [];
  const sportsLevel = new Map();
  user.certificates.forEach((certificate) => {
    sportsLevel.set(certificate.sport, certificate.level);
  });
  courses.forEach((course) => {
    if (
      course.minCertificateLevel <=
      (sportsLevel.get(course.sport) == undefined
        ? 1
        : sportsLevel.get(course.sport))
    ) {
      arr.push(course);
    }
  });
  res.status(200).json({
    success: true,
    courses: arr,
  });
});

module.exports = router;

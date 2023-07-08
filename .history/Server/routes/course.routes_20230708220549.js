const express = require("express");
const Course = require("../models/courseModels");
const User = require("../models/userModels");
const router = express.Router();

router.route("/upload").post(async (req, res) => {});

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
  courses.forEach((course) => {
    if (course.minCertificateLevel <= user.certificateLevel) {
      arr.push(course);
    }
  });
});

module.exports = router;

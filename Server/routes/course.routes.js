const express = require("express");
const Course = require("../models/courseModels");
const User = require("../models/userModels");
const router = express.Router();
const multer = require("multer");
const DIR = "./public";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/upload",
  upload.array("attachments", function (error, result) {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  }),
  async (req, res, next) => {
    // console.log("Multer request:", req);

    if (req.files && req.files.length !== 0) {
      req.files.forEach(function (file) {
        file.path = `http://localhost:5000/${file.path}`;
      });
    }

    next();
  },
  async (req, res) => {
    // console.log(req.files);

    try {
      const { sports, gradingLevel, courseTitle, userID } = req.body;
      const filesContent = [];
      req.files.forEach((file) => {
        filesContent.push({
          title: file.originalname,
          link: file.path,
        });
      });
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
      // const user = await User.findOne({ _id: req.body.id});
      // let found_ = false;
      // user.certificate.forEach((certificate)=> {
      //   if(certificate.sport === req.body.sport){
      //     if(certificate.level !== "pro"){
      //       return res.status(400).json({
      //         success: false,
      //         message: "Only Pro certificate holder can create courses"
      //       })
      //     }
      //   }
      // });
      // if(!found_){
      //   return res.status(400).json({
      //     success: false,
      //     message: "Only Pro certificate holder can create courses",
      //   })
      // }

      let course = {
        title: courseTitle,
        sport: sports,
        minCertificateLevel: gradingLevel,
        contents: filesContent,
        createdBy: userID,
      };
      const courseData = await Course.create(course);
      console.log(courseData);
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
  }
);

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

//For getting all courses
router.route("/allcourses").get(async (req, res) => {
  const courses = await Course.find({});
  // courses = [1, 2];
  res.status(200).json({
    success: true,
    courses,
  });
  console.log("all courses");
});

//For getting single course
router.route("/:id").get(async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    course,
  });
});

router.route("/courseName/:sport").get(async (req, res) => {
  const courses = await Course.find({ sport: req.params.sport });
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

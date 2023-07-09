const express = require("express");
const router = express.Router();
const User = require("../models/userModels");

/*
body: {email, password};
*/

router.route("/:id").get(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
});
router.route("/addCertificate/:id").post(async (req, res) => {
  let certificate = { sport: req.body.sport, level: req.body.grading };
  // console.log(certificate);
  let user = await User.findById(req.params.id);
  if (!user.certificate) user.certificate = [];
  let found_ = false;
  user.certificate.forEach((c1) => {
    if (c1.sport === certificate.sport) {
      c1.level = certificate.level;
      found_ = true;
    }
  });
  if (found_ == false) {
    user.certificate.push(certificate);
  }

  console.log(await user.save());
  res.status(200).json({
    success: true,
    message: "Certificate Added succesfully",
  });
});

router.route("/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    console.log();
    return res.status(200).json({
      success: true,
      id: user._id,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

/*
req.body = {
  name, email, password, certificate
}
*/
router.route("/signup").post(async (req, res) => {
  // name, email, password, certificate
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    certificate: req.body.certificate,
  });
  res.status(201).json({
    success: true,
    message: "user created successfully",
    id: user._id,
  });
});

module.exports = router;

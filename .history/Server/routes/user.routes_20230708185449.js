const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const db = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (db) {
    console.log("Found");
    res.json({
      message: true,
      userid: db._id,
    });
  } else {
    console.log("Not Found");
    res.json({
      message: false,
    });
  }
});

router.post("/signup", async (req, res) => {
  const db = await User.find({ email: req.body.email });
  if (db.length > 0) {
    console.log("Email exists");
    res.json({
      message: false,
    });
  } else {
    console.log("new Email");
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      type: "user",
    });

    let AllUsers;
    try {
      AllUsers = await User.find({});
    } catch (err) {
      console.log(err);
    }
    testController.addUser(AllUsers, user);
    await User.deleteMany({});
    try {
      await User.insertMany(AllUsers);
    } catch (err) {
      console.log(err);
    }
  }
  console.log("In signup Route");
});

export default router;

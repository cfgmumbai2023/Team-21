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

export default router;

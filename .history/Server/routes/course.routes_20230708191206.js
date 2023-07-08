const express = require("express");
const router = express.Router();

router.route("/upload").post(),
  async (req, res) => {
    console.log("In upload route");
    console.log(req.body);
    con;
  };

export default router;

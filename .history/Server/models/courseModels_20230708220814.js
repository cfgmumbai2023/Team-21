const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  sport: {
    name: String,
  },
  minCertificateLevel: Number,
  content: [
    {
      title: String,
      link: String,
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);

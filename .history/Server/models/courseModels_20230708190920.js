const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  sport: {
    title: String,
    enum: ["football", "cricket"],
  },
  minExperience: {
    type: Number,
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

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  sport: {
    type: String,
  },
  minCertificateLevel: String,
  contents: [
    {
      title: String,
      link: String,
    },
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  quiz: [
    {
      question: String,
      option1: String,
      option2: String,
      option3: String,
      option4: String,
      rightOption: Number,
    }
  ]
});

module.exports = mongoose.model("Course", courseSchema);

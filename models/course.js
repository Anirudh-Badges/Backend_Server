const mongoose = require("mongoose");

exports.courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  whatInstructorTaught: {
    type: String,
  },
  ratingAndReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratingAndReview ",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  studentEnrolled: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("course", courseSchema);

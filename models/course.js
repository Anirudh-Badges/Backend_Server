const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  Instructor: {
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
  studentEnrolled:{
    type:String,
  }
},{timestamps: true});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;

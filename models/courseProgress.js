const mongoose = require("mongoose");

exports.courseProgressSchema = new mongoose.Schema({
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "course",
    },

},{timestamps: true});

module.exports = mongoose.model("courseProgress",courseProgressSchema);
const mongoose = require("mongoose");

exports.ratingAndReviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "course",
		index: true,
	},
},{timestamps: true});

module.exports = mongoose.model("ratingAndReview", ratingAndReviewSchema);
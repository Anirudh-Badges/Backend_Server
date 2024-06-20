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
    }
},{timestamps: true});

module.exports = mongoose.model("ratingAndReview", ratingAndReviewSchema);
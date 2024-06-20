const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:60*5
    }
},{timestamps:true})

module.exports = mongoose.model("otp",otpSchema);
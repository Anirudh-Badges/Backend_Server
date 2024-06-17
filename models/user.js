const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    firstname : {
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true,
    },
    approved:{
        type:Boolean,
        default:true
    },
    accountType:{
        type:String,
        enum:["Admin","Instructor","Student"],
        requrired:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"profile"
    },
    // course:[

    // ]
    token:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    // courseProgress:{

    // }
},{timestamps:true})

module.exports = mongoose.model("user",userSchema);
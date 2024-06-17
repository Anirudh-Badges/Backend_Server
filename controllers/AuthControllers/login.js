const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");

require('dotenv').config();

exports.login = async (req,res) => {
    try {

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"please fill all the fields"
            })
        }

        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not exist please signup first"
            })
        }

        const compareingPassword = await bcrypt.compare(password,user.password);

        if(compareingPassword){

            const payload = {
                id:user._id,
                email:user.email,
                password:user.password,
                accountType:user.accountType
            }

            const token = await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            });

            user.token = token;
            user.password = undefined;

            const option = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }

            return res.cookie("token",token,option).json({
                success : true,
                token,
                user,
                message: "LoggedIn Successfully "
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });

        }
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again'
        })
    }
}


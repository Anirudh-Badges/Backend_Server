const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();

exports.auth = async(req, res, next) => {
  try {
    const token = req.body.token
      || req.cookies.token
      || req.header("Authorisation").replace("Bearer ", "");

    console.log("token :",token);
    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing"
      })
    }

    //verify the token
    try {
      const payLoad = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(payLoad);
      req.user = payLoad;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    }

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: 'Something went wrong while validating the token',
    });
  }
};

exports.isStudent = async(req, res, next) => {
  try {
    if (req.user.accountType != "Student") {
      return res.status(401).json({
        success: false,
        message: "Protected route for student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account type is not matching",
    });
  }
};

exports.isAdmin = async(req, res, next) => {
  try {
    if (req.user.accountType != "Admin") {
      return res.status(401).json({
        success: false,
        message: "Protected route for Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account type is not matching",
    });
  }
};

exports.isInstructor = async(req, res, next) => {
  try {
    if (req.user.accountType != "Instructor") {
      return res.status(401).json({
        success: false,
        message: "Protected route for Instructor",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account type is not matching",
    });
  }
};

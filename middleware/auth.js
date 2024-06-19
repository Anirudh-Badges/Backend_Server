const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token =
      req.header("Authorization").replace("Bearer","") ||
      req.cookie.token ||
      req.body.token;
    if (!token){
      return res.status(401).json({
        success: false,
        error: "Access denied. No token provided.",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.SECRET_KET);
      req.user = payload;
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: "Invalid token",
        });
    }

    next();
  } catch (error) {
    res.status(401).json({
        success: false,
        message: "Something went wrong . token not found "
    });
  }
};

exports.isStudent = (req, res, next) => {
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

exports.isAdmin = (req, res, next) => {
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

exports.isInstructor = (req, res, next) => {
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

const express = require("express");

const route = express.Router();


// routes
const { sendOtp } = require("../controllers/AuthControllers/sendotp");
const { signup } = require("../controllers/AuthControllers/sigup");




route.post('/signup', signup);
route.post('/sendOtp', sendOtp);


module.exports = route;
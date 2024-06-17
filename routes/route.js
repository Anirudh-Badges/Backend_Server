const express = require("express");

const route = express.Router();


// routes
const { sendOtp } = require("../controllers/AuthControllers/sendotp");
const { signup } = require("../controllers/AuthControllers/sigup");
const {login} = require("../controllers/AuthControllers/login");''



route.post('/signup', signup);
route.post('/sendOtp', sendOtp);
route.post('/login',login);


module.exports = route;
const express = require("express");

const route = express.Router();


// routes
const { sendOtp } = require("../controllers/AuthControllers/sendotp");
const { signup } = require("../controllers/AuthControllers/sigup");
const {login} = require("../controllers/AuthControllers/login");''
const {changePassword} = require("../controllers/AuthControllers/changePassword")


route.post('/signup', signup);
route.post('/sendOtp', sendOtp);
route.post('/login',login);
route.post('/changePassword',changePassword);


module.exports = route;
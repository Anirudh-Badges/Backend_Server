const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth");

const {createCourse} = require("../controllers/CourseController/createCourse");
const {getAllCourses} = require("../controllers/CourseController/getAllCourses");
const {deleteCourse} = require("../controllers/CourseController/deleteCourse");
const {updateCourse} = require("../controllers/CourseController/updateCourse");


// routes
router.post("/createCourse",auth, createCourse);
router.get("/getAllCourses",auth, getAllCourses);
router.delete("/deleteCourse",auth, deleteCourse);
router.put("/updateCourse",auth, updateCourse);


module.exports = router;
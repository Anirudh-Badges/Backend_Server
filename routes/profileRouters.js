const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth");

const { deleteAccount } = require("../controllers/ProfileControllers/deleteAccount");
const { getAllUserDetails } = require("../controllers/ProfileControllers/getAllUserDetails");
const { updateDisplayPic } = require("../controllers/ProfileControllers/updateDisplayPic");
const { updateProfile } = require("../controllers/ProfileControllers/updateProfile");


router.delete("/deleteAccount/",auth, deleteAccount);
router.get("/getAllUserDetails",auth, getAllUserDetails);
router.put("/updateDisplayPic/",auth, updateDisplayPic);
router.put("/updateProfile/",auth, updateProfile);


module.exports = router;
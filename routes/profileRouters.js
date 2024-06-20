const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth");

const { deleteAccount } = require("../controllers/ProfileControllers/deleteAccount");
const { getAllUserDetails } = require("../controllers/ProfileControllers/getAllUserDetails");
const { updateDisplayPicture } = require("../controllers/ProfileControllers/updateDisplayPic");
const { updateProfile } = require("../controllers/ProfileControllers/updateProfile");


router.delete("/deleteAccount",auth, deleteAccount);
router.get("/getAllUserDetails",auth, getAllUserDetails);
router.put("/updateDisplayPicture",auth, updateDisplayPicture);
router.put("/updateProfile",auth, updateProfile);


module.exports = router;
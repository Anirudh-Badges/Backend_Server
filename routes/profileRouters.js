const express = require("express");
const router = express.Router();

const { deleteAccount } = require("../controllers/ProfileControllers/deleteAccount");
const { getAllUserDetails } = require("../controllers/ProfileControllers/getAllUserDetails");
const { updateDisplayPic } = require("../controllers/ProfileControllers/updateDisplayPic");
const { updateProfile } = require("../controllers/ProfileControllers/updateProfile");


router.delete("/deleteAccount/:_id", deleteAccount);
router.get("/getAllUserDetails", getAllUserDetails);
router.put("/updateDisplayPic/:_id", updateDisplayPic);
router.put("/updateProfile/:_id", updateProfile);


module.exports = router;
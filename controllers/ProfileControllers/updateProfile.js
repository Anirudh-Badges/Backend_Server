const User = require("../../models/user");
const Profile = require('../../models/profile');

exports.updateProfile = async (req, res) => {
    try{
        const {gender , dateOfBirth, about="", contactNumber}= req.body;
        const user = await User.findById(req.user.id);
        // console.log(user);
        const profile = await Profile.findById(user.additionalDetails);

        // update the profile fields
        profile.gender = gender;
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        
        console.log(profile);

        await profile.save();
        return res.status(200).json({
            success:true,
            message:"Profile update successfully",
            profile:profile,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
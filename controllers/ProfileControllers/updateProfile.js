const User = require("../../models/user");


exports.updateProfile = async (req, res) => {
    try{
        const {gender , dateOfBirth, about="", contactNumber}= req.body;
        const userDetails = await User.findById(req.user.id);
        const profile = await User.findByIdAndUpdate(userDetails.additionalDetails);
        profile.gender = gender;
        profile.about = about;
        profile.dateOfBirth = dateOfBirth;
        profile.contactNumber = contactNumber;

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
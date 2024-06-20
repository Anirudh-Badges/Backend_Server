const mongoose = require("mongoose");
const Profile = require("../../models/profile");
const User = require("../../models/user"); // Ensure correct model import

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id; // Ensure this is a string
        console.log(id);

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const user = await User.findById(id); 
        console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Retrieve the profile ID from additionalDetails
        const profileId = user.additionalDetails;

        // Delete the profile if it exists
        if (profileId && mongoose.Types.ObjectId.isValid(profileId)) {
            await Profile.findByIdAndDelete(profileId); // Directly pass the profile ID string
        }

        // Delete the user
        await User.findByIdAndDelete(id); // Directly pass the user ID string

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully",
        });
    }
};

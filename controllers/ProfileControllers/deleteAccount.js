const mongoose = require("mongoose");
const Profile = require("../../models/profile");
const User = require("../../models/user"); 

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id; 
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

        await Profile.findByIdAndDelete(id); 
        await User.findByIdAndDelete(id); 

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

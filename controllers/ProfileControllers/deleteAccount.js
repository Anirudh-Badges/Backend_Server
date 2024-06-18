const Profile = require("../../models/profile");
const User = require("../../models/profile");


exports.deleteAccount = async (req, res) => {
    try {
      const id = req.user.id;
      const user = await User.findByIdAndDelete({ _id: id });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      await Profile.findByIdAndDelete({ _id: user.additionalDetails });
  
      await User.findByIdAndDelete({ _id: id });
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
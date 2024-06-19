const User = require("../../models/user");


exports.getAllUserDetails = async (req, res) => {
    try {
      const id = req.user.id;
      const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec();
        
      console.log(userDetails);
  
      return res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        data: userDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
  
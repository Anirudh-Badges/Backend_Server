
const User = require("../../models/user");

exports.changePassword = async (req, res) => {
    try {
      const userDetails = await User.findById(req.user.id);
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const Matchpassoword = await bcrypt.compare(
        oldPassword,
        userDetails.password
      );
  
      if (!Matchpassoword) {
        return res.status(401).json({
          success: false,
          message: "password not matched",
        });
      }
  
      if(newPassword !== confirmNewPassword){
        return res.status(401).json({
          success: false,
          message: "new password and confirm new password did not match"
        });
      }
  
      const hashNewPassword = await bcrypt.hash(newPassword, 10);
          const updateUserDetails = await User.findByIdAndUpdate(
              req.user.id,
              { password: hashNewPassword },
              { new: true }
          )
  
  
      return res.status(200).json({
        success: true,
        message: "password changed successfully",
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: "Password cannot changed",
      });
    }
  };
  
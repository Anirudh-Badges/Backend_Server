const User = require("../../models/user");
const { uploadImageToCloudinary } = require("../../utils/imageUploader");

exports.updateDisplayPicture = async (req, res) => {
  try {
    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No display picture file provided",
      });
    }

    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is not provided",
      });
    }

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    if (!image || !image.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary",
      });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.send({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

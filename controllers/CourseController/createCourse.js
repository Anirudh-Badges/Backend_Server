const Course = require("../../models/course");
const User = require("../../models/user");
const { uploadImageToCloudinary } = require("../../utils/imageUploader");

exports.createCourse = async (req, res) => {
  try {
    const userId = req.body.id;
    const {
      courseName,
      courseDescription,
      instructor, // Corrected variable name
      whatInstructorTaught,
      ratingAndReview,
      price,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;
    
    // Check for missing fields
    if (
      !courseName ||
      !courseDescription ||
      !instructor ||
      !whatInstructorTaught ||
      !ratingAndReview ||
      !price ||
      !thumbnail
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Find instructor details
    const instructorDetails = await User.findOne({ _id: instructor, accountType: "Instructor" });
    
    if (!instructorDetails) {
      return res.status(404).json({
        message: "Instructor Details not found"
      });
    }

    // Upload thumbnail image
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    // Create new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatInstructorTaught: whatInstructorTaught,
      price,
      thumbnail: thumbnailImage.secure_url
    });

    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

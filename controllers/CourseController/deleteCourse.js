const Course = require("../../models/course");

exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.body.id;

        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting course:", error); 
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the course",
            error: error.message,
        });
    }
};

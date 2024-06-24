const Course = require("../../models/course");

exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.body.id;
        const updateData = req.body;

        const { courseName, price, thumbnail, instructor } = updateData;
        if (!courseName || !price || !thumbnail || !instructor) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
 
        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the course",
            error: error.message,
        });
    }
};

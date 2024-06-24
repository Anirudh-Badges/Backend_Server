const Course = require("../../models/course");

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: 'course data not fetched',
			error: error.message,
		});
	}
};

const Enrollment = require("../models/Enrollment.js")
const Course = require("../models/course.js")
exports.enrollmentCourse = async (req, res) => {
    try{
        const {courseId} = req.body;
        const existing = await Enrollment.findOne({student: req.user.id, course: courseId});
        if(existing) return res.status(400).json({message: "Alread enrolled"});
        const enrollment = new Enrollment({
            student: req.user.id,
            course: courseId
        })
        await enrollment.save();
        res.json({message: "Successfully enroll"})
    }catch(err){
        res.status(500).json({message: "Server Error"})
    }
}

exports.getMyCourses = async (req, res) => {
    try {
        // Sirf is student ke enrollments dhundo
        const enrollments = await Enrollment.find({ student: req.user.id })
            .populate('course');

        if (!enrollments) {
            return res.status(200).json([]);
        }

        res.status(200).json(enrollments);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
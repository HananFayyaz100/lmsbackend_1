const express = require("express")

const router = express.Router();
const {enrollmentCourse, getMyCourses} = require("../controllers/enrollmentController.js")
const {protect} = require("../middleware/user.js");

router.post("/", protect, enrollmentCourse)
// router.get('/my-courses', protect, enrollmentCourse);
router.get('/my-courses', protect, getMyCourses); // 👈 Naya route

module.exports = router;

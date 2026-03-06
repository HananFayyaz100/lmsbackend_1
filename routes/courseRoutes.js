const express = require("express")

const router = express.Router();
const {createCourse, getCourses, updateCourse, deleteCourse, getInstructorCourse} = require("../controllers/coursecontrollers.js")
const {protect, authorize} = require("../middleware/user.js");

router.get("/", getCourses)
router.post("/", protect, authorize("Instructor", "Admin"), createCourse);
router.put("/:id", protect, authorize("Instructor", "Admin"), updateCourse);
router.delete("/:id", protect, authorize("Instructor", "Admin"), deleteCourse);
router.get("/instructor-my-course", protect, authorize("Instructor"), getInstructorCourse);


module.exports = router;
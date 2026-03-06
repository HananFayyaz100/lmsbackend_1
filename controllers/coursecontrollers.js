const Course = require("../models/course.js");

exports.createCourse = async (req, res) => {
    try{
        const {title, description, category, price} = req.body;
        const newCourse = await new Course({
            title,
            description,
            category,
            price,
            instructor: req.user.id
        })
        const course = await newCourse.save();
        res.status(201).json(course);
    }catch(err){
        res.status(500).json({message: "Server Error", error: err.message})
    }
}


exports.getCourses = async (req, res) => {
    try{
        const course = await Course.find().populate("instructor", "name");
        if (!course) return res.status(400).json({message: "Course not found"});
        res.json(course);
    }catch(err){
        res.status(500).json({message: "Server Error", error: err.message})
    }
}
exports.updateCourse = async (req, res) => {
    try{
        let course = await Course.findById(req.params.id);
        if(!course) return res.status(400).json({message: "Course not found"});
        if(course.instructor.toString() !== req.user.id && req.user.role !== "Admin"){
            return res.status(500).json({message: "Not Authorized"});
        }
        course = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(course);
    }catch(err){
        res.status(500).json({message: "Server Error", error: err.message})
    }
}

exports.deleteCourse = async(req, res) => {
    try{
        const course = await Course.findById(req.params.id);
        if(!course) return res.status(400).json({message: "Course not found"});
        await Course.findByIdAndDelete(req.params.id);
        res.json({message: "Course Delete Successfully"});
    }catch(err){
        res.status(500).json({message: "Server Error", error: err.message});
    }
}

exports.getInstructorCourse = async (req, res) => {
    try{
        const course = await Course.find({instructor: req.user.id});
        res.status(200).json(course);
    }catch(err){
        res.status(500).json({message: "Server error"})
    }
}
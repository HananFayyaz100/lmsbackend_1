const mongoose = require("mongoose")
const enrollmentSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref: "Course", require: true},
    progress: {type: Number, default: 0}
}, {timestamps: true})
module.exports = mongoose.model("Enrollment", enrollmentSchema)
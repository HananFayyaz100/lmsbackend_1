const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    category: {type: String, require: true},
    price: {type: String , require: true},
    lessons: [
        {
        title: String,
        videoUrl: String,
        content: String
        }
    ]
}, {timestamps: true})
module.exports = mongoose.model("Course", courseSchema)
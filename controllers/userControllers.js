const User = require("../models/User.js")
exports.getAllUsers = async (req, res) => {
    try{
        const getallUsers = await User.find().select("-password");
        res.status(200).json(getallUsers);
    }catch(err){
        res.status(500).json({message: "Server error", err})
    }
}
exports.deleteUser = async (req, res) => {
    try{
        const deleteUser = await User.findById(req.params.id);
        if(!deleteUser) return res.status(200).json({message: "user not found"});
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json({message: "User Deleted Successfully"});
    }catch(err){
        res.status(500).json({message: "Server error", err})
    }
}
exports.getUserProfile = async (req, res) => {
    try{
        const getuserprofile = await User.findById(req.params.id).select("-password");
        if(!getuserprofile) return res.status(200).json({message: "user not found"});
        res.status(200).json(getuserprofile);
    }catch(err){
        res.status(500).json({message: "Server error", err})
    }
}
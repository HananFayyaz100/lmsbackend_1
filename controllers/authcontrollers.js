const User = require("../models/User.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
exports.registerUser = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already registered"});
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        user = new User({
            name,
            email,
            password: hashed,
            role: role || 'Student'
        })
        await user.save();
        res.status(200).json({message: "User Registered Successfully", user});
    }catch(err){
        res.status(500).json({message: "Server Error", error: err.message})
    }
}

exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid Credentials"});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid credentials"});
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {"expiresIn": '1d'}          
        );
        res.json({
            token,
            user: {id: user._id, name: user.name, role: user.role}
    })

    }catch(err){
        res.status(500).json({message: "Server Error", err})
    }
}

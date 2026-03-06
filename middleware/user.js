const jwt = require("jsonwebtoken")
const protect = (req, res, next) => {
    const token = req.headers.authorization;
    if (token && token.startsWith('Bearer')){
        try{
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }catch(err){
            res.status(201).json({message: "Not Authorized"})
        }
    }else{
        res.status(401).json({message: "Not authorized by role"})
    }
}
const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(201).json({message: "Not Authorized by user"});
        }
        next();
    }
}
module.exports = {protect, authorize};

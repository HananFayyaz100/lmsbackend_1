// server.js mein routes se pehle:
require('./models/course');
require('./models/User');
require('./models/Enrollment'); 
const express = require("express")
const connectDB = require("./config/db.js")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors({
    origin: ["https://lmsProject_1.vercel.app", "http://localhost:3000"], // 👈 Yahan apne frontend ka naya URL add karna hoga
    credentials: true
}));


app.get("/", (req, res) => {
    res.json({message: "Congrats This is the Home Page"})
})
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/courses", require("./routes/courseRoutes.js"));
app.use("/api/enroll", require("./routes/enrollmentRoutes.js"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running on port 5000"));

module.exports = app;
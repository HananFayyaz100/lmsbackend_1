const express = require("express")
const router = express.Router()
const {protect, authorize} = require("../middleware/user.js")

const {getAllUsers, deleteUser} = require("../controllers/userControllers.js")

router.get("/", protect, authorize("Admin"), getAllUsers);
router.delete("/:id", protect, authorize("Admin"), deleteUser);


module.exports = router;

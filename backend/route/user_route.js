const express = require("express");
const { signup, login } = require("../controller/user_controller"); // Adjust the path as necessary
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

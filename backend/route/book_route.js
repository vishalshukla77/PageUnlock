const express = require("express");
const { getBook } = require("../controller/book_controller"); // Use require

const router = express.Router();

router.get("/", getBook);

module.exports = router; // Use module.exports

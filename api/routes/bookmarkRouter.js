const express = require('express');
const router = express.Router();

const bookmarkController = require("../controllers/bookmarkController");


router.post("/", bookmarkController.toggleBookmark);

module.exports = router;
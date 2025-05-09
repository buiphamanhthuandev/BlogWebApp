const express = require('express');
const router = express.Router();

const contactController = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", contactController.getAllContacts);
router.post("/", contactController.createContact);

module.exports = router;
const express = require('express');
const router = express.Router();

const postcategoryController = require("../controllers/postCategoryController");

router.post('/', postcategoryController.addPostCategory);
router.delete('/', postcategoryController.removePostCategory);

module.exports = router;
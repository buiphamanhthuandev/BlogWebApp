const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const categoryController = require("../controllers/categoryController");

router.get("/", authMiddleware.authenticateToken,  categoryController.getAllCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
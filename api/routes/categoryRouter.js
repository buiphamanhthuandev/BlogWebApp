const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const categoryController = require("../controllers/categoryController");
const authorizeRole = require("../middleware/authorizeRoleMiddleware");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", authMiddleware.authenticateToken, authorizeRole('admin'), categoryController.createCategory);
router.put("/:id", authMiddleware.authenticateToken, authorizeRole('admin'), categoryController.updateCategory);
router.delete("/:id", authMiddleware.authenticateToken, authorizeRole('admin'), categoryController.deleteCategory);

module.exports = router;
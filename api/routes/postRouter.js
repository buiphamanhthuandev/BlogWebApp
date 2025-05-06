const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRoleMiddleware");
router.get("/", postController.getAllPosts);
router.get("/topview", postController.getTopViewPost);
router.get("/:id", postController.getPost);
router.post("/", authMiddleware.authenticateToken, authorizeRole('admin'), upload.single('image'), postController.createPost);
router.put("/:id", authMiddleware.authenticateToken, authorizeRole('admin'), upload.single('image'), postController.updatePost);
router.delete("/:id", authMiddleware.authenticateToken, authorizeRole('admin'), postController.deletePost);

module.exports = router;
const express = require('express');
const router = express.Router();

const commentController = require("../controllers/commentController");
const authMiddleware = require('../middleware/authMiddleware')
router.get("/", commentController.getAllComments);
router.get("/post/:id", commentController.getByIdPostInComment);
router.post("/", authMiddleware.authenticateToken, commentController.createComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
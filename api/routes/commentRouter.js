const express = require('express');
const router = express.Router();

const commentController = require("../controllers/commentController");

router.get("/", commentController.getAllComments);
router.get("/post/:id", commentController.getByIdPostInComment);
router.post("/", commentController.createComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
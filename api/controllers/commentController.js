const Comment = require("../models/comment");

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.createComment = async (req, res) => {
  const { content, post_id, user_id } = req.body;
  if (!content || !post_id || !user_id) return res.status(400).json({ message: 'All fields required' });
  try {
    const newComment = await Comment.create({ content, post_id, user_id });
    res.status(201).json({ message: 'Comment created', newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

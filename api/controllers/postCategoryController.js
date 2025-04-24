const PostCategory = require('../models/post-category');

exports.addPostCategory = async (req, res) => {
  const { post_id, category_id } = req.body;
  try {
    const relation = await PostCategory.create({ post_id, category_id });
    res.status(201).json({ message: 'Category assigned to post', relation });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning category to post', error });
  }
};

exports.removePostCategory = async (req, res) => {
  const { post_id, category_id } = req.body;
  try {
    await PostCategory.destroy({ where: { post_id, category_id } });
    res.status(200).json({ message: 'Category removed from post' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing category from post', error });
  }
};

const {Like} = require("../models/index");

exports.toggleLike = async (req, res) => {
  const { post_id, user_id } = req.body;
  try {
    const like = await Like.findOne({ where: { post_id, user_id } });
    if (like) {
      await like.destroy();
      return res.status(200).json({ message: 'Unliked' });
    } else {
      const newLike = await Like.create({ post_id, user_id });
      return res.status(201).json({ message: 'Liked', newLike });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error toggling like', error });
  }
};

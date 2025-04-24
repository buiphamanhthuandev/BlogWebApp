const {Bookmark} = require("../models/index");

exports.toggleBookmark = async (req, res) => {
  const { post_id, user_id } = req.body;
  try {
    const bookmark = await Bookmark.findOne({ where: { post_id, user_id } });
    if (bookmark) {
      await bookmark.destroy();
      return res.status(200).json({ message: 'Bookmark removed' });
    } else {
      const newBookmark = await Bookmark.create({ post_id, user_id });
      return res.status(201).json({ message: 'Post bookmarked', newBookmark });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error toggling bookmark', error });
  }
};
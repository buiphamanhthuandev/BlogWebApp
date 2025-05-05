require('dotenv').config();
const {Post, Category} = require("../models/index");
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;

    const totalPosts = await Post.count();

    const posts = await Post.findAll({
      limit,
      offset,
      order: [['created_at', order]],
      include: [
        {
          model: Category,
          through: { attributes: [] }
        }
      ]
    });
    const totalPages = Math.ceil(totalPosts / limit);
    const pagination = {
      currentPage: page,
      totalPosts,
      totalPages: totalPages,
      limit,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    }
    res.set('x-pagination', JSON.stringify(pagination));
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error",error: error.message });
  }
};

exports.getPost = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: Category,
          through: { attributes: [] }
        }
      ]
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, category_ids = [] } = req.body;
  if (!title || !content || !user_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const imageUrl = req.file ? `${process.env.APPURL}/uploads/${req.file.filename}` : 'https://loremflickr.com/800/600/city'
  try {
    const newPost = await Post.create({ title, content, user_id: req.user.id, image: imageUrl });

    if (category_ids.length > 0) {
      await newPost.setCategories(category_ids);
    }

    res.status(201).json({ message: "Post created", newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, category_ids } = req.body;
  if (!title || !content || !user_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.user_id = req.user.id,
    post.title = title || post.title;
    post.content = content || post.content;
    post.image = req.file ? `${process.env.APPURL}public/uploads/${req.file.filename}` : post.image;
    await post.save();

    if (Array.isArray(category_ids)) {
      await post.setCategories(category_ids);
    }

    res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message});
  }
};

exports.deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    await post.destroy();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// const Post = require("../models/post");
// const Category = require("../models/category");
const {Post, Category} = require("../models/index");
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Category,
          through: { attributes: [] }
        }
      ]
    });
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
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
  const { title, content, user_id, category_ids = [] } = req.body;
  if (!title || !content || !user_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newPost = await Post.create({ title, content, user_id });

    if (category_ids.length > 0) {
      await newPost.setCategories(category_ids);
    }

    res.status(201).json({ message: "Post created", newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

exports.updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content,user_id, category_ids } = req.body;
  if (!title || !content || !user_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    if (Array.isArray(category_ids)) {
      await post.setCategories(category_ids);
    }

    res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
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
    res.status(500).json({ message: "Internal server error", error });
  }
};

require('dotenv').config();
const slugify = require('slugify');
const {v4: uuidv4} = require('uuid');
const { Op } = require('sequelize');
const {Post, Category} = require("../models/index");
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    console.log('test search: ', search);
    const whereClause = search
  ? { title: { [Op.like]: `%${search}%` } }
  : {};

    const totalPosts = await Post.count({
      where: whereClause
    });

    const posts = await Post.findAll({
      where: whereClause,
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
    if(!posts){
      return res.status(404).json({message: "Post not found"});
    }
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

exports.getPostsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryid;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;


    console.log('test categoryid: ',categoryId);
    const totalPosts = await Post.count({
      include: [
        {
          model: Category,
          where: { id: categoryId}
        }
      ]
    });

    const posts = await Post.findAll({
      limit,
      offset,
      order: [['created_at', order]],
      include: [
        {
          model: Category,
          where: {id: categoryId},
          through: { attributes: [] }
        }
      ]
    });
    if(!posts){
      return res.status(404).json({message: "Post not found"});
    }
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

    post.view = post.view + 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, category_ids = [] } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const imageUrl = req.file ? `${process.env.APPURL}/uploads/${req.file.filename}` : 'https://loremflickr.com/800/600/city'
  try {
    const baseSlug = slugify(title, {lower: true, strict: true});
    const shortId = uuidv4().split('-')[0];
    const slug = `${baseSlug}-${shortId}`;

    const newPost = await Post.create({ title, content, user_id: req.user.id, image: imageUrl, slug });

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
  if (!title || !content) {
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

exports.getTopViewPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      limit: 5,
      order: [['view', 'DESC']],
      include: [
        {
          model: Category,
          through: { attributes: [] }
        }
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}
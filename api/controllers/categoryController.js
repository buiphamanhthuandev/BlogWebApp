const { Json } = require("sequelize/lib/utils");
const Category = require("../models/category");

exports.getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;

    const totalCategories = await Category.count();

    const categories = await Category.findAll({
      limit,
      offset,
      order: [["created_at", order]]
    });
    const totalPages = Math.ceil(totalCategories / limit);
    const pagination = {
      currentPage: page,
      totalCategories,
      totalPages: totalPages,
      limit,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages
    }

    res.set('X-Pagination', JSON.stringify(pagination));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  try {
    const newCategory = await Category.create({ name });
    res.status(201).json({ message: 'Category created', newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.messager });
  }
};

exports.updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    await category.update(req.body);
    res.status(200).json({ message: 'Category updated', category });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    await category.destroy();
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const {Comment} = require("../models/index");

exports.getAllComments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
    const offset = (page - 1) * limit;

    const totalComments = await Comment.count();

    const comments = await Comment.findAll({
      limit,
      offset,
      order: [['created_at', order]]
    });
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalComments / limit),
      totalComments,
      comments
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
exports.getByIdPostInComment = async(req, res) => {
  const id = parseInt(req.params.id);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
  const offset = (page - 1) * limit;
  
  const totalComments = await Comment.count({ where : {post_id : id} });

  try{
    const comments = await Comment.findAll({
      where: {post_id: id}, 
      limit, 
      offset, 
      order: [['created_at', order]]
    });
    res.status(200).json({
      message: "List comments for id Post", 
      currentPage: page,
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      comments
    });
  } catch (error) {
    res.status(500).json({message: 'Internal server error', error});
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
exports.deleteComment = async (req, res) => {
  const id = parseInt(req.params.id);
  if(id < 1){
    res.status(400).json({
      message: "Id is required"
    });
  }
  try{
    const comment = await Comment.findByPk(id);
    if(!comment) return res.status(404).json({
      message: "comment not found"
    });
    await comment.destroy();
    res.status(200).json({
      message: "Comment deleted"
    });
  }catch(error) {
    res.status(500).json({
      message: "Internal server error", 
      error
    })
  }
}
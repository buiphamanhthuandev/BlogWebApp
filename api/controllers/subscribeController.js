const Subscribe = require("../models/subscribe");


exports.getAllSubscribes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;

    const totalSubscribes = await Subscribe.count();

    const subscribes = await Subscribe.findAll({
      limit,
      offset,
      order: [['created_at', order]],
    });
    if(!subscribes || subscribes.length === 0){
      return res.status(404).json({message: "Post not found"});
    }
    const totalPages = Math.ceil(totalSubscribes / limit);
    const pagination = {
      currentPage: page,
      totalSubscribes,
      totalPages: totalPages,
      limit,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    }
    res.set('x-pagination', JSON.stringify(pagination));
    res.status(200).json(subscribes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error",error: error.message });
  }
};

exports.createSubscribe = async (req, res) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const newSubscribe = await Subscribe.create({ email });

        res.status(201).json({ message: "Subscribe created", newSubscribe});
    } catch (error) {
        res.status(500).json({ message: "Error creating subscribe", error: error.message});
    }
}
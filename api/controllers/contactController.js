const Contact = require("../models/contact");

exports.getAllContacts = async (req, res) => {
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
        const totalContacts = await Contact.count({
            where: whereClause
        });

        const contacts = await Contact.findAll({
            where: whereClause,
            limit,
            offset,
            order: [['created_at', order]],
        })
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message: "Contact not found"});
        }
        const totalPages = Math.ceil(totalContacts / limit);
        const pagination = {
            currentPage: page,
            totalContacts,
            totalPages: totalPages,
            limit,
            hasPreviousPage: page > 1,
            hasNextPage: page < totalPages,
        }
        res.set('x-pagination', JSON.stringify(pagination));
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message});
    }
}
exports.createContact = async (req, res) => {
  const { username, content, email } = req.body;
  if (!username || !content || !email) {
    return res.status(400).json({ message: "Username, email, content is required" });
  }
  try {
  
    const newContact = await Contact.create({ username, email, content});

    res.status(201).json({ message: "Contact created", newContact });
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error: error.message });
  }
};
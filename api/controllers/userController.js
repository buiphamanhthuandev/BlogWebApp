const bcrypt = require("bcrypt");
const User = require("../models/user");
exports.getAllUsers = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
        const offset = (page - 1) * limit;

        const totalUsers = await User.count();
        const users = await User.findAll({
            limit,
            offset,
            order: [['created_at', order]]
        });
        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            users
        });
    }catch(error){
        res.status(500).json({
            message: "Internal server error", 
            error: error.message
        });
    }
}

exports.getUser = async (req, res) => {
    const id = parseInt(req.params.id);
   
    try{
        const user = await User.findByPk(id);
        
        if(!user){
            return res.status(404).send({
                message: 'user not found'
            });
        }
        res.status(201).json({
            user
        })
    }catch(error){
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
exports.getByEmailUser = async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        return res.status(400).json({
          message: 'Email không tồn tại.',
        });
      }
    try{
        const user = await User.findOne({where: {email} });
        
        if(!user){
            return res.status(404).send({
                message: 'user not found'
            });
        }
        res.status(201).json(user)
    }catch(error){
        console.log("test error: ", error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

exports.createUser = async (req, res) => {
    const {username, email, password, role} = req.body;
    
    if(!username || !email || !password || !role){
        return res.status(400).send({
            message: "username, email, password and role cannot be empty!"
        });
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await User.create({
            username,
            email,
            password : hashedPassword,
            role
        });
        res.status(201).json({
            message: 'User registered successfully',
            newUser: newUser
        });
    }catch(error){
        res.status(500).json({
            message: 'An error occurred while registering the user',
            error: error.message
        });
    }
    
}
exports.updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {username, email, password, role} = req.body;
    try{
        const user = await User.findByPk(id);
        
        if(!user){
            return res.status(404).send({
                message: "user not found"
            });
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            user.username = username;
            user.email = email;
            user.password = hashedPassword;
            user.role = role;
            await user.save();

            res.status(201).json({
                message: 'User updated successfully',
                user
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }  
}
exports.deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try{
        const user = await User.findByPk(id);
        
        if(!user){
            return res.status(404).send({
                message: "user not found"
            });
        } 
        await user.destroy();

        res.status(201).json({
            message: 'User deleted!'
        });
        
    }catch(error){
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }  
}

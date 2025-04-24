const bcrypt = require("bcrypt");
const User = require("../models/user");
exports.getAllUsers = (req, res) => {
    User.findAll()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({message: 'Internal server error', error: error}));
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
            error
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
            message: 'An error occurred while registering the user'
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
            error
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
            error
        });
    }  
}

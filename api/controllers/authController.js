const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

require('dotenv').config();
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if(!username, !email, !password){
    return res.status(400).json({
      message: "Missing username, email or password"
    });
  }
  try {
    const existingUser = await User.scope('withAllData').findOne({where: {email}});
    if(existingUser){
      return res.status(409).json({
        message: "Email already in use"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role: "user"});
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.scope('withAllData').findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });
    


    const accesstoken = jwt.sign(
      { id: user.id, email: user.email,  role: user.role }, 
      process.env.JWT_SECRET, 
      { algorithm: 'HS256', expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      {id: user.id},
      process.env.JWT_REFRESH_SECRET,
      { algorithm: "HS256", expiresIn: '7d'}
    )
    user.refresh_token = refreshToken;
    await user.save();
    res.status(201).json({ message: "Login successful", accesstoken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshtoken } = req.body;
  if(!refreshtoken){
    return res.status(401).json({
      message: "No refresh token provided"
    });
  }
  try{
    const decoded  = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);
    const user = await User.scope('withAllData').findByPk(decoded.id);
    if(!user || user.refresh_token !== refreshtoken){
      return res.status(403).json({
        message: "Invalid refresh token" 
      });
    }
    const newAccessToken = jwt.sign(
      {id: user.id, email: user.email, role: user.role},
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "1h"}
    )
    res.status(200).json({
      accesstoken: newAccessToken
    });
  }catch(error){
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}


exports.logout = async (req, res) => {
  const {userid} = req.body;
  if(userid < 1){
    return res.status(400).json({
      message: "Id is required"
    });
  }
  try{
    const user = await User.scope('withAllData').findByPk(userid);
    if(user){
      await user.update({ refresh_token : null});
    }
    res.status(200).json({
      message: "Logout successfully"
    });
  }catch(error){
    res.status(500).json({
      message: "Logout Failed",
      error
    })
  }
};
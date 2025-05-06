const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

require('dotenv').config();
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if(!username, !email, !password){
    return res.status(400).json({
      message: "Lỗi tên đăng nhập, email hoặc mật khẩu!"
    });
  }
  const existingEmail = await User.scope('withAllData').findOne({where: {email}});
    if(existingEmail){
      return res.status(409).json({
        message: "Email đã tồn tại!"
      });
    }
    const existingUserName = await User.scope('withAllData').findOne({where: {username}});
    if(existingUserName){
      return res.status(409).json({
        message: "Tên đăng nhập đã tồn tại!"
      });
    }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role: "user"});
    res.status(201).json({ message: "Tạo tài khoản thành công", user });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.scope('withAllData').findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email không đúng, vui lòng nhập lại!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Mật khẩu không đúng, vui lòng nhập lại!" });

    const accesstoken = jwt.sign(
      { id: user.id, email: user.email,  role: user.role }, 
      process.env.JWT_SECRET, 
      { algorithm: 'HS256', expiresIn: '1h' }
    );
    console.log("role in token:", user.role); 
    const refreshToken = jwt.sign(
      {id: user.id},
      process.env.JWT_REFRESH_SECRET,
      { algorithm: "HS256", expiresIn: '7d'}
    )
    user.refresh_token = refreshToken;
    await user.save();
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Login successful", accesstoken});
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const refreshtoken  = req.cookies.refreshToken;
  if(!refreshtoken){
    return res.status(401).json({
      message: "No refresh token provided"
    });
  }
  try{
    const payload  = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);
    const user = await User.scope('withAllData').findByPk(payload.id);
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
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict'
    })

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
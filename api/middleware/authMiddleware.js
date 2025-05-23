const jwt = require('jsonwebtoken');
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log("Decoded JWT:", user);
      if (err) return res.status(403).json({ message: "Invalid or expired token" });
      req.user = user;
      next();
    });
};
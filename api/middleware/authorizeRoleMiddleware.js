
module.exports = function authorizeRole(roleRequired) {
    return (req, res, next) => {
      console.log("authorizeRole middleware called");
      console.log("User role:", req.user?.role);
  
      if (!req.user || req.user.role !== roleRequired) {
        return res.status(403).json({ message: "Access denied: Admin only" });
      }
      next();
    };
  };
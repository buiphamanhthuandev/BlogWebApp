const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRoleMiddleware");

router.get("/all", userController.getAllUsers);
router.get("/by-email",authMiddleware.authenticateToken, userController.getByEmailUser);
router.get("/by-id/:id", userController.getUser);
router.post("/",authMiddleware.authenticateToken, authorizeRole('admin'), userController.createUser);
router.put("/:id", authMiddleware.authenticateToken, authorizeRole('admin'), userController.updateUser);
router.delete("/:id", authMiddleware.authenticateToken, authorizeRole('admin'), userController.deleteUser);



module.exports = router;
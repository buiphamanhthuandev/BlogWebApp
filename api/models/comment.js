// models/Comment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define("Comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  tableName: "comments"
});

module.exports = Comment;

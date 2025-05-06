// models/Comment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define("Comment", {
  post_id:{
    type: DataTypes.INTEGER
  },
  user_id	: {
    type: DataTypes.INTEGER
  },
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

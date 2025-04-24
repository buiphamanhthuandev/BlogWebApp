// models/Bookmark.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bookmark = sequelize.define("Bookmark", {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  tableName: "bookmarks"
});

module.exports = Bookmark;

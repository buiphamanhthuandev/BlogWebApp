// models/PostCategory.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PostCategory = sequelize.define("PostCategory", {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: "post_categories"
});

module.exports = PostCategory;

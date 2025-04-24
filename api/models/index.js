const User = require("./user");
const Post = require("./post");
const Category = require("./category");
const PostCategory = require("./post-category");
const Comment = require("./comment");
const Like = require("./like");
const Bookmark = require("./bookmark");


User.hasMany(Post, {foreignKey: 'user_id'});
Post.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Comment, {foreignKey: 'user_id'});
Comment.belongsTo(User, {foreignKey: 'user_id'});

Post.hasMany(Comment, {foreignKey: 'post_id'});
Comment.belongsTo(Post, {foreignKey: 'post_id'});

Post.belongsToMany(Category, {
    through: PostCategory,
    foreignKey: "post_id"
});

Category.belongsToMany(Post, {
    through: PostCategory,
    foreignKey: "category_id"
});

User.belongsToMany(Post, {
    through: Like,
    foreignKey: "user_id", 
    as: "LikedPosts"
});
Post.belongsToMany(User, {
    through: Like,
    foreignKey: "post_id",
    as: "likedByUsers"
});

User.belongsToMany(Post, {
    through: Bookmark,
    foreignKey: "user_id",
    as: "BookmarkdPosts"
});

Post.belongsToMany(User, {
    through: Bookmark,
    foreignKey: "post_id",
    as: "BookmarkUsers"
});

module.exports = {
    User,
    Post,
    Category,
    PostCategory,
    Like,
    Bookmark,
    Comment
};

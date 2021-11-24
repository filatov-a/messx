"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Posts extends Model {
		static associate(models) {
			Posts.hasMany(models.LikesToPosts, {foreignKey: "postId", onDelete: "cascade", hooks: true});
			Posts.hasMany(models.Comments, {foreignKey: "postId", onDelete: "cascade", hooks: true});
			Posts.hasMany(models.PostsImages, {foreignKey: "postId", onDelete: "cascade", hooks: true});
			Posts.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade", hooks: true});
			Posts.belongsToMany(models.PostsCategories, {
				through: "PostsAndCategories",
				foreignKey: "postId",
				onDelete: "cascade",
				hooks: true
			});
		}
	}
	Posts.init({
		title: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
		content: DataTypes.STRING,
		userId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "Posts",
	});
	return Posts;
};
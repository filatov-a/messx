"use strict";
const {	Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Posts extends Model {
		static associate(models) {
			Posts.hasMany(models.LikesPosts, {foreignKey: "postId", onDelete: "cascade"});
			Posts.hasMany(models.Comments, {foreignKey: "postId", onDelete: "cascade"});
			Posts.hasMany(models.PostsImages, {foreignKey: "postId", onDelete: "cascade"});
			Posts.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade"});
			Posts.belongsToMany(models.PostsCategories, {
				through: "PostsToCategories",
				foreignKey: "postId",
				onDelete: "cascade",
			});
		}

		getAll() {

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

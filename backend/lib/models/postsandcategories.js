
"use strict";

const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PostsAndCategories extends Model {
		static associate(models) {

		}
	}
	PostsAndCategories.init({
		postId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "PostsAndCategories",
	});
	return PostsAndCategories;
};
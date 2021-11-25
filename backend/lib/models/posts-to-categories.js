
"use strict";

const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PostsToCategories extends Model {
		static associate(models) {

		}
	}
	PostsToCategories.init({
		postId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "PostsToCategories",
	});
	return PostsToCategories;
};

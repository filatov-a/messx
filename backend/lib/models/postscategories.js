
"use strict";

const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PostsCategories extends Model {
		static associate(models) {

		}
	}
	PostsCategories.init({
		postId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "PostsCategories",
	});
	return PostsCategories;
};
"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PostsCategories extends Model {
		static associate(models) {
			PostsCategories.belongsToMany(models.Posts, {
				through: "PostsAndCategories",
				foreignKey: "categoryId",
				onDelete: "cascade",
				hooks: true
			});
		}
	}
	PostsCategories.init({
		title: DataTypes.STRING,
		description: DataTypes.STRING,
	}, {
		sequelize,
		modelName: "PostsCategories",
	});
	return PostsCategories;
};
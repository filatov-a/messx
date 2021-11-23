"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Categories extends Model {
		static associate(models) {
			Categories.belongsToMany(models.Posts, {
				through: "PostsCategories",
				foreignKey: "categoryId",
				onDelete: "cascade",
				hooks: true
			});
		}
	}
	Categories.init({
		title: DataTypes.STRING,
		description: DataTypes.STRING,
	}, {
		sequelize,
		modelName: "Categories",
	});
	return Categories;
};
"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ChatsCategories extends Model {
		static associate(models) {
			ChatsCategories.belongsToMany(models.Chats, {
				through: "ChatsAndCategories",
				foreignKey: "categoryId",
				onDelete: "cascade",
				hooks: true
			});
		}
	}
	ChatsCategories.init({
		title: DataTypes.STRING,
		description: DataTypes.STRING,
	}, {
		sequelize,
		modelName: "ChatsCategories",
	});
	return ChatsCategories;
};
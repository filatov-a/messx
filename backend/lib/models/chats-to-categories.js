"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ChatsToCategories extends Model {
		static associate(models) {

		}
	}
	ChatsToCategories.init({
		chatId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "ChatsToCategories",
	});
	return ChatsToCategories;
};

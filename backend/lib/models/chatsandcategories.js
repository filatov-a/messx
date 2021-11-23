"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ChatsAndCategories extends Model {
		static associate(models) {

		}
	}
	ChatsAndCategories.init({
		chatId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "ChatsAndCategories",
	});
	return ChatsAndCategories;
};
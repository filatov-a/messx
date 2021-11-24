
"use strict";

const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UsersChats extends Model {
		static associate(models) {}
	}
	UsersChats.init({
		userId: DataTypes.INTEGER,
		chatId: DataTypes.INTEGER,
		isAamin: DataTypes.BOOLEAN,
	}, {
		sequelize,
		modelName: "UsersChats",
	});
	return UsersChats;
};

"use strict";

const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UsersToChats extends Model {
		static associate(models) {}
	}
	UsersToChats.init({
		userId: DataTypes.INTEGER,
		chatId: DataTypes.INTEGER,
		isAdmin: DataTypes.BOOLEAN,
	}, {
		sequelize,
		modelName: "UsersToChats",
	});
	return UsersToChats;
};

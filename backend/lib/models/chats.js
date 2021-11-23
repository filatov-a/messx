"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Chats extends Model {
		static associate(models) {
			Chats.hasMany(models.Messages, { foreignKey: "cahtId", onDelete: "cascade"});
			Chats.belongsToMany(models.Users, {
				through: "UsersChats",
				foreignKey: "chatId",
				onDelete: "cascade",
			});
		}
	}
	Chats.init({
		name: DataTypes.STRING,
		picture: DataTypes.STRING,
		priority: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "Chats",
	});
	return Chats;
};
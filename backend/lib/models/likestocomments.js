"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class LikesToComments extends Model {
		static associate(models) {
			LikesToComments.belongsTo(models.Comments, {foreignKey: "commentId", onDelete: "cascade", hooks: true});
			LikesToComments.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade", hooks: true});
		}
	}
	LikesToComments.init({
		type: DataTypes.ENUM(["like", "dislike"]),
		userId: DataTypes.INTEGER,
		commentId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "LikesToComments",
	});
	return LikesToComments;
};
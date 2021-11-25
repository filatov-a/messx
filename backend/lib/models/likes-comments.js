"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class LikesComments extends Model {
		static associate(models) {
			LikesComments.belongsTo(models.Comments, {foreignKey: "commentId", onDelete: "cascade", hooks: true});
			LikesComments.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade", hooks: true});
		}
	}
	LikesComments.init({
		type: DataTypes.ENUM(["like", "dislike"]),
		userId: DataTypes.INTEGER,
		commentId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "LikesComments",
	});
	return LikesComments;
};

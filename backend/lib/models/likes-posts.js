"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class LikesPosts extends Model {
		static associate(models) {
			LikesPosts.belongsTo(models.Posts, {foreignKey: "postId", onDelete: "cascade", hooks: true});
			LikesPosts.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade", hooks: true});
		}
	}
	LikesPosts.init({
		type: DataTypes.ENUM(["like", "dislike"]),
		userId: DataTypes.INTEGER,
		postId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "LikesPosts",
	});
	return LikesPosts;
};

"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class LikesToPosts extends Model {
		static associate(models) {
			LikesToPosts.belongsTo(models.Posts, {foreignKey: "postId", onDelete: "cascade", hooks: true});
			LikesToPosts.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade", hooks: true});
		}
	}
	LikesToPosts.init({
		type: DataTypes.ENUM(["like", "dislike"]),
		userId: DataTypes.INTEGER,
		postId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "LikesToPosts",
	});
	return LikesToPosts;
};
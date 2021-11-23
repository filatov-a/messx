"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comments extends Model {
		static associate(models) {
			Comments.belongsTo(models.Posts, {foreignKey: "postId", onDelete: "cascade", hooks: true});
			Comments.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade", hooks: true});
			Comments.hasMany(models.LikesToComments, {foreignKey: "commentId", onDelete: "cascade", hooks: true});
		}
	}
	Comments.init({
		content: DataTypes.STRING,
		userId: DataTypes.INTEGER,
		postId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "Comments",
	});
	return Comments;
};
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
			Comments.belongsToMany(Comments, {
				through: "CommentsAndComments",
				as: "Comments",
				foreignKey: "commentId",
				onDelete: "set null",
			});
			Comments.belongsToMany(Comments, {
				through: "MessagesAndMessages",
				as: "Answers",
				foreignKey: "commentAnswerId",
				onDelete: "set null",
			});
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
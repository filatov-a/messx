"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comments extends Model {
		static associate(models) {
			Comments.belongsTo(models.Posts, {foreignKey: "postId", onDelete: "cascade"});
			Comments.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade"});
			Comments.hasMany(models.LikesComments, {foreignKey: "commentId", onDelete: "cascade"});
			Comments.belongsToMany(Comments, {
				through: "CommentsToAnswers",
				as: "Comments",
				foreignKey: "commentId",
				onDelete: "set null",
			});
			Comments.belongsToMany(Comments, {
				through: "MessagesToAnswers",
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

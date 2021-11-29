const Base = require("./base");

class Comments extends Base {
	static modelSchema = {
		content: this.DT.STRING,
		userId: this.DT.INTEGER,
		postId: this.DT.INTEGER,
	}

	static modelName = "Comments";

	static associate(models) {
		Comments.belongsTo(models.Posts, {
			foreignKey: "postId",
			onDelete: "cascade"
		});
		Comments.belongsTo(models.Users, {
			foreignKey: "userId",
			onDelete: "cascade"
		});
		Comments.hasMany(models.LikesComments, {
			foreignKey: "commentId",
			onDelete: "cascade"
		});
		Comments.belongsToMany(models.Comments, {
			through: "CommentsToAnswers",
			as: "Comments",
			foreignKey: "commentId",
			onDelete: "set null",
		});
		Comments.belongsToMany(models.Comments, {
			through: "MessagesToAnswers",
			as: "Answers",
			foreignKey: "commentAnswerId",
			onDelete: "set null",
		});
	}
}

module.exports = Comments

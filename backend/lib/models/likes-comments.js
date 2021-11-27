const Base = require("./base");

class LikesComments extends Base {
	static modelSchema ={
		type: this.DT.ENUM(["like", "dislike"]),
		userId: this.DT.INTEGER,
		commentId: this.DT.INTEGER,
	}
	static modelName = "LikesComments";

	static associate(models) {
		LikesComments.belongsTo(models.Comments, {foreignKey: "commentId", onDelete: "cascade", hooks: true});
		LikesComments.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade", hooks: true});
	}
}
module.exports = LikesComments;

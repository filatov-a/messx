const Base = require("./base");

class LikesPosts extends Base {
	static modelSchema = {
		type: this.DT.ENUM(["like", "dislike"]),
		userId: this.DT.INTEGER,
		postId: this.DT.INTEGER,
	}
	static modelName = "LikesPosts";
	static associate(models) {
		LikesPosts.belongsTo(models.Posts, {foreignKey: "postId", onDelete: "cascade", hooks: true});
		LikesPosts.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade", hooks: true});
	}
}

module.exports = LikesPosts;

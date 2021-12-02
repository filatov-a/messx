import Base from "./base.mjs";

export default class LikesPosts extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		type: this.DT.ENUM(["like", "dislike"]),
		userId: this.DT.UUID,
		postId: this.DT.UUID,
	}
	static modelName = "LikesPosts";
	static associate(models) {
		LikesPosts.belongsTo(models.Posts, {
			foreignKey: "postId",
			onDelete: "cascade"
		});
		LikesPosts.belongsTo(models.Users, {
			foreignKey: "userId",
			onDelete: "cascade"
		});
	}
}

import Base from "./base.mjs";

export default class LikesComments extends Base {
	static modelSchema ={
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		type: this.DT.ENUM(["like", "dislike"]),
		userId: this.DT.UUID,
		commentId: this.DT.UUID,
	}
	static modelName = "LikesComments";

	static associate(models) {
		LikesComments.belongsTo(models.Comments, {
			foreignKey: "commentId",
			onDelete: "cascade",
		});
		LikesComments.belongsTo(models.Users, {
			foreignKey: "userId",
			onDelete: "cascade"
		});
	}
}

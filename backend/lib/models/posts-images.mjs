import Base from "./base.mjs";

export default class PostsImages extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		image: this.DT.STRING,
		postId: this.DT.UUID,
	}
	static modelName = "PostsImages";

	static associate(models) {
		PostsImages.belongsTo(models.Posts, {foreignKey: "postId", onDelete: "cascade", hooks: true});
	}
}

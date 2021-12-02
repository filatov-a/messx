import Base from "./base.mjs";

export default class PostsToCategories extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		postId: this.DT.UUID,
		categoryId: this.DT.INTEGER,
	}
	static modelName = "PostsToCategories";

	static associate(models) {}
}

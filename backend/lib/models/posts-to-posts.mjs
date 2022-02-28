import Base from "./base.mjs";

export default class PostsToPosts extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		postId: this.DT.UUID,
		questionId: this.DT.UUID,
	}
	static modelName = "PostsToPosts";

	static associate(models) {}
}

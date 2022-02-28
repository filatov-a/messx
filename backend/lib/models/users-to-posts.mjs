import Base from "./base.mjs";

export default class UsersToPosts extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		userId: this.DT.UUID,
		postId: this.DT.UUID,
	}
	static modelName = "UsersToPosts";
	static associate(models) {}
}

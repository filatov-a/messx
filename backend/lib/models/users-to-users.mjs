import Base from "./base.mjs";

export default class UsersToUsers extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		userId: this.DT.UUID,
		followerId: this.DT.UUID,
	}
	static modelName = "UsersToUsers";
	static associate(models) {}
}

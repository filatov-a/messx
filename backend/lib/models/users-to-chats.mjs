import Base from "./base.mjs";

export default class UsersToChats extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		userId: this.DT.UUID,
		chatId: this.DT.UUID,
		isAdmin: this.DT.BOOLEAN,
	}
	static modelName = "UsersToChats";
	static associate(models) {}
}

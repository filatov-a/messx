import Base from "./base.mjs";

export default class ChatsToCategories extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		chatId: this.DT.UUID,
		categoryId: this.DT.UUID,
	}
	static modelName = "ChatsToCategories";
	static associate(models) {}
}

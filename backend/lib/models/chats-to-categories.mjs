import Base from "./base.mjs";

export default class ChatsToCategories extends Base {
	static modelSchema = {
		chatId: this.DT.INTEGER,
		categoryId: this.DT.INTEGER,
	}
	static modelName = "ChatsToCategories";
	static associate(models) {}
}

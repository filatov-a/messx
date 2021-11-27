"use strict";
const Base= require("./base");
class ChatsToCategories extends Base {
	static modelSchema = {
		chatId: this.DT.INTEGER,
		categoryId: this.DT.INTEGER,
	}
	static modelName = "ChatsToCategories";
	static associate(models) {}
}

module.exports = ChatsToCategories

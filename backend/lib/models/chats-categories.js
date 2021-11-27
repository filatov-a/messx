const Base = require("./base");

class ChatsCategories extends Base {
	static modelSchema ={
		title: this.DT.STRING,
		description: this.DT.STRING,
	}
	static modelName = "ChatsCategories";

	static associate(models) {
		ChatsCategories.belongsToMany(models.Chats, {
			through: "ChatsAndCategories",
			foreignKey: "categoryId",
			onDelete: "cascade",
			hooks: true
		});
	}
}

module.exports = ChatsCategories

import Base from "./base.mjs";

export default class ChatsCategories extends Base {
	static modelSchema ={
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
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

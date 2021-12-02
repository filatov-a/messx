import Base from "./base.mjs";

export default class Chats extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		name: this.DT.STRING,
		picture: this.DT.STRING,
		priority: this.DT.INTEGER,
	}
	static modelName =  "Chats"

	static associate(models) {
		this.hasMany(models.Messages, {
			foreignKey: "chatId",
			onDelete: "cascade"
		});
		this.belongsToMany(models.Users, {
			through: "UsersToChats",
			foreignKey: "chatId",
			onDelete: "cascade",
		});
	}

	static AddUser(){

	}
}

import Base from "./base.mjs";

export default class Messages extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		name: this.DT.STRING,
		descriptions: this.DT.STRING,
		isActive: this.DT.BOOLEAN,
		chatId: this.DT.UUID,
		userId: this.DT.UUID,
	}
	static modelName = "Messages";

	static associate(models) {
		Messages.hasMany(models.MessagesImages, {foreignKey: "messageId", onDelete: "cascade"});
		Messages.belongsTo(models.Chats, {foreignKey: "chatId", onDelete: "cascade"});
		Messages.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade"});
		Messages.belongsToMany(Messages, {
			through: "MessagesToAnswers",
			as: "messages",
			foreignKey: "messageId",
			onDelete: "set null",
		});
		Messages.belongsToMany(Messages, {
			through: "MessagesToAnswers",
			as: "answers",
			foreignKey: "messageAnswerId",
			onDelete: "set null",
		});
	}
}

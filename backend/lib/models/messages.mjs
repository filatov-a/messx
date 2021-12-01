import Base from "./base.mjs";

export default class Messages extends Base {
	static modelSchema = {
		name: this.DT.STRING,
		descriptions: this.DT.STRING,
		image: this.DT.STRING,
		isActive: this.DT.BOOLEAN,
		chatId: this.DT.INTEGER,
	}
	static modelName = "Messages";

	static associate(models) {
		Messages.belongsTo(models.Chats, {foreignKey: "chatId", onDelete: "cascade"});
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

const Base = require("./base");

class Messages extends Base {
	static modelSchema = {
		name: this.DT.STRING,
		descriptions: this.DT.STRING,
		image: this.DT.STRING,
		messageId: this.DT.INTEGER,
		isActive: this.DT.BOOLEAN,
		chatId: this.DT.INTEGER,
	}
	static modelName = "Messages";

	static associate(models) {
		Messages.belongsTo(models.Chats, {foreignKey: "chatId", onDelete: "cascade"});
		Messages.belongsToMany(models.Messages, {
			through: "MessagesAndMessages",
			as: "Messages",
			foreignKey: "messageId",
			onDelete: "set null",
		});
		Messages.belongsToMany(models.Messages, {
			through: "MessagesAndMessages",
			as: "Answers",
			foreignKey: "messageAnswerId",
			onDelete: "set null",
		});
	}
}

module.exports = Messages


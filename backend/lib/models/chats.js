const Base = require("./base");

class Chats extends Base {
	static modelSchema = {
		name: this.DT.STRING,
		picture: this.DT.STRING,
		priority: this.DT.INTEGER,
	}
	static modelName =  "Chats"

	static associate(models) {
		Chats.hasMany(models.Messages, { foreignKey: "messageId", onDelete: "cascade"});
		Chats.belongsToMany(models.Users, {
			through: "UsersToChats",
			foreignKey: "chatId",
			onDelete: "cascade",
		});
	}
}

module.exports = Chats;

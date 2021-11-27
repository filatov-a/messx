const Base = require("./base");

class UsersToChats extends Base {
	static modelSchema = {
		userId: this.DT.INTEGER,
		chatId: this.DT.INTEGER,
		isAdmin: this.DT.BOOLEAN,
	}
	static modelName = "UsersToChats";
	static associate(models) {}
}

module.exports = UsersToChats;

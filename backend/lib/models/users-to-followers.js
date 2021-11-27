const Base = require("./base");

class UsersToFollowers extends Base {
	static modelSchema = {
		userId: this.DT.INTEGER,
		followerId: this.DT.INTEGER,
	}
	static modelName = "UsersToFollowers";
	static associate(models) {}
}

module.exports = UsersToFollowers;

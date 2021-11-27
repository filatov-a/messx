const Base = require("./base");

class MessagesToAnswers extends Base {
	static modelSchema = {
		messageId: this.DT.INTEGER,
		messageAnswerId: this.DT.INTEGER,
	}
	static modelName = "MessagesToAnswers";

	static associate(models) {}
}

module.exports = MessagesToAnswers;

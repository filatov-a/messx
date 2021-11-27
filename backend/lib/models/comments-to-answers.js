const Base = require("./base");

class CommentsToAnswers extends Base {
	static modelSchema = {
		commentId: this.DT.INTEGER,
		commentAnswerId: this.DT.INTEGER,
	}

	static modelName = "CommentsToAnswers";

	static associate(models) {}
}

module.exports = CommentsToAnswers



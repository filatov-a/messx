import Base from "./base.mjs";

export default class MessagesToAnswers extends Base {
	static modelSchema = {
		messageId: this.DT.INTEGER,
		messageAnswerId: this.DT.INTEGER,
	}
	static modelName = "MessagesToAnswers";

	static associate(models) {}
}

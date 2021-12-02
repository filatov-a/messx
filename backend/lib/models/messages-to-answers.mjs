import Base from "./base.mjs";

export default class MessagesToAnswers extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		messageId: this.DT.UUID,
		messageAnswerId: this.DT.UUID,
	}
	static modelName = "MessagesToAnswers";

	static associate(models) {}
}

import Base from "./base.mjs";

export default class MessagesToMessages extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		messageId: this.DT.UUID,
		answerId: this.DT.UUID,
	}
	static modelName = "MessagesToMessages";

	static associate(models) {}
}

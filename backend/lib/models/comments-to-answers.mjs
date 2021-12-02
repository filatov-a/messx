import Base from "./base.mjs";

export default class CommentsToAnswers extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		commentId: this.DT.UUID,
		commentAnswerId: this.DT.UUID,
	}
	static modelName = "CommentsToAnswers";

	static associate(models) {}
}

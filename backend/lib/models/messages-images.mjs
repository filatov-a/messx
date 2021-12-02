import Base from "./base.mjs";

export default class MessagesImages extends Base {
    static modelSchema = {
        id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
        image: this.DT.STRING,
        messageId: this.DT.UUID,
    }
    static modelName = "MessagesImages";

    static associate(models) {
        MessagesImages.belongsTo(models.Messages, {foreignKey: "postId", onDelete: "cascade"});
    }
}

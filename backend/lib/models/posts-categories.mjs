import Base from "./base.mjs";

export default class PostsCategories extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		title: this.DT.STRING,
		description: this.DT.STRING,
	}
	static modelName = "PostsCategories";

	static associate(models) {
		PostsCategories.belongsToMany(models.Posts, {
			through: "PostsToCategories",
			foreignKey: "categoryId",
			onDelete: "cascade",
		});
	}
}

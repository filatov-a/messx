import Base from "./base.mjs";

export default class PostsCategories extends Base {
	static modelSchema = {
		title: this.DT.STRING,
		description: this.DT.STRING,
	}
	static modelName = "PostsCategories";

	static associate(models) {
		PostsCategories.belongsToMany(models.Posts, {
			through: "PostsAndCategories",
			foreignKey: "categoryId",
			onDelete: "cascade",
			hooks: true
		});
	}
}

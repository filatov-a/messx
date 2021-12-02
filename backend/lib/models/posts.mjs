import Base from "./base.mjs";

export default class Posts extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		title: this.DT.STRING,
		isActive: this.DT.BOOLEAN,
		content: this.DT.STRING,
		userId: this.DT.UUID,
	}
	static modelName = "Posts";

	static associate(models) {
		Posts.hasMany(models.LikesPosts, {foreignKey: "postId", onDelete: "cascade"});
		Posts.hasMany(models.Comments, {foreignKey: "postId", onDelete: "cascade"});
		Posts.hasMany(models.PostsImages, {foreignKey: "postId", onDelete: "cascade"});
		Posts.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade"});
		Posts.belongsToMany(models.PostsCategories, {
			through: "PostsToCategories",
			foreignKey: "postId",
			onDelete: "cascade",
		});
	}
}

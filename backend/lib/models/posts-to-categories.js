const Base = require("./base");

class PostsToCategories extends Base {
	static modelSchema = {
		postId: this.DT.INTEGER,
		categoryId: this.DT.INTEGER,
	}
	static modelName = "PostsToCategories";

	static associate(models) {}
}

module.exports = PostsToCategories;

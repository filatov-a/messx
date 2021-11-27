const Base = require("./base");

class PostsImages extends Base {
	static modelSchema = {
		image: this.DT.STRING,
		postId: this.DT.INTEGER,
	}
	static modelName = "PostsImages";

	static associate(models) {
		PostsImages.belongsTo(models.Posts, {foreignKey: "postId", onDelete: "cascade", hooks: true});
	}
}

module.exports = PostsImages;

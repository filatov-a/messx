
"use strict";

const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PostsImages extends Model {
		static associate(models) {
			PostsImages.belongsTo(models.Posts, {foreignKey: "postId", onDelete: "cascade", hooks: true});
		}
	}
	PostsImages.init({
		iamge: DataTypes.STRING,
		postId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "PostsImages",
	});
	return PostsImages;
};
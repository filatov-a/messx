const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CommentsAndComments extends Model {
		static associate(models) {}
	}
	CommentsAndComments.init({
		commentId: DataTypes.INTEGER,
		commentAnswerId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "CommentsAndComments",
	});

	return CommentsAndComments;
};

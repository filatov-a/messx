const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class CommentsToAnswers extends Model {
		static associate(models) {}
	}
	CommentsToAnswers.init({
		commentId: DataTypes.INTEGER,
		commentAnswerId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "CommentsToAnswers",
	});

	return CommentsToAnswers;
};

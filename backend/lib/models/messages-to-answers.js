const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class MessagesToAnswers extends Model {
		static associate(models) {}
	}
	MessagesToAnswers.init({
		messageId: DataTypes.INTEGER,
		messageAnswerId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "MessagesToAnswers",
	});

	return MessagesToAnswers;
};

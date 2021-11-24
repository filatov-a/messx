const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class MessagesAndMessages extends Model {
		static associate(models) {}
	}
	MessagesAndMessages.init({
		messageId: DataTypes.INTEGER,
		messageAnswerId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "MessagesAndMessages",
	});

	return MessagesAndMessages;
};

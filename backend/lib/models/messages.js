const {
	Model, INTEGER,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Messages extends Model {
		static associate(models) {
			Messages.belongsTo(models.Chats, {foreignKey: "chatId", onDelete: "cascade"});
			Messages.belongsToMany(Messages, {
				through: "MessagesAndMessages",
				as: "Messeges",
				foreignKey: "messageId",
				onDelete: "set null",
			});
			Messages.belongsToMany(Messages, {
				through: "MessagesAndMessages",
				as: "Answers",
				foreignKey: "messageAnswerId",
				onDelete: "set null",
			});
		}
	}
	Messages.init({
		name: DataTypes.STRING,
		descriptions: DataTypes.STRING,
		image: DataTypes.STRING,
		messageId: DataTypes.INTEGER,
		isActive: DataTypes.BOOLEAN,
		chatId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "Messages",
	});

	return Messages;
};

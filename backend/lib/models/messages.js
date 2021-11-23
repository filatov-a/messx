const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Messages extends Model {
		static associate(models) {
			Messages.belongsTo(models.Chats, {foreignKey: "chatId", onDelete: "cascade"});
		}
	}
	Messages.init({
		name: DataTypes.STRING,
		descriptions: DataTypes.STRING,
		image: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
		chatId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "Messages",
	});

	return Messages;
};

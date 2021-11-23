const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Messages extends Model {
		static associate(models) {
			Messages.belongsTo(models.Users, {foreignKey: "userId", onDelete: "cascade"});
		}
	}
	Messages.init({
		name: DataTypes.STRING,
		descriptions: DataTypes.STRING,
		image: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
		userId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "Messages",
	});

	return Messages;
};

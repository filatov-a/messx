const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class UerersAndUsers extends Model {
		static associate(models) {}
	}
	UerersAndUsers.init({
		userId: DataTypes.INTEGER,
		followerId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "UerersAndUsers",
	});

	return UerersAndUsers;
};

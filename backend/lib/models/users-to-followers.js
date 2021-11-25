const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class UsersToFollowers extends Model {
		static associate(models) {}
	}
	UsersToFollowers.init({
		userId: DataTypes.INTEGER,
		followerId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: "UsersToFollowers",
	});

	return UsersToFollowers;
};

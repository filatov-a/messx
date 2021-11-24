const {
	Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		static associate(models) {
			Users.hasMany(models.Posts, { foreignKey: "userId", onDelete: "cascade"});
			Users.hasMany(models.LikesToComments, { foreignKey: "userId", onDelete: "cascade"});
			Users.hasMany(models.LikesToPosts, { foreignKey: "userId", onDelete: "cascade"});
			Users.belongsToMany(models.Chats, {
				through: "UsersChats",
				foreignKey: "userId",
				onDelete: "cascade",
			});
			Users.belongsToMany(Users, {
				through: "UsersAndUsers",
				as: "Users",
				foreignKey: "userId",
				onDelete: "set null",
			});
			Users.belongsToMany(Users, {
				through: "UsersAndUsers",
				as: "Followers",
				foreignKey: "followerId",
				onDelete: "set null",
			});
		}
	}
	Users.init({
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		full_name: DataTypes.STRING,
		gender: DataTypes.ENUM(["male", "female"]),
		email: DataTypes.STRING,
		profile_picture: DataTypes.STRING,
		rating: DataTypes.INTEGER,
		phone: DataTypes.STRING,
		card: DataTypes.STRING,
		role: DataTypes.ENUM(["user", "admin", "superAdmin"]),
		isVerified: DataTypes.BOOLEAN,
		isActive: DataTypes.BOOLEAN,
	}, {
		sequelize,
		modelName: "Users",
	});

	return Users;
};

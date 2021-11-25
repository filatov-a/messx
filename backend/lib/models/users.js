const { Model } = require("sequelize");
const argon2 = require("argon2");

module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		static associate(models) {
			Users.hasMany(models.Posts, { foreignKey: "userId", onDelete: "cascade"});
			Users.hasMany(models.LikesComments, { foreignKey: "userId", onDelete: "cascade"});
			Users.hasMany(models.LikesPosts, { foreignKey: "userId", onDelete: "cascade"});
			Users.belongsToMany(models.Chats, {
				through: "UsersT0Chats",
				foreignKey: "userId",
				onDelete: "cascade",
			});
			Users.belongsToMany(Users, {
				through: "UsersToFollowers",
				as: "users",
				foreignKey: "userId",
				onDelete: "set null",
			});
			Users.belongsToMany(Users, {
				through: "UsersToFollowers",
				as: "followers",
				foreignKey: "followerId",
				onDelete: "set null",
			});
		}
		static async getAllUsers(limit, offset, where = {}){
			return await Users.findAndCountAll({
				limit: limit,
				offset: offset,
				where: where
			});
		}
		static async getUserById(id, include){
			return await Users.findOne({
				where: {id: id},
				include: [include]
			});
		}
		static async createUser(params){
			const login = await Users.findOne({ where: { login: params.login } });
			const email = await Users.findOne({ where: { email: params.email } });
			if (login !== null) throw new Error("login is busy");
			if (email !== null) throw new Error("email is busy");
			return await Users.create(params);
		}
		static async updateUser({id, params}){
			const user = await Users.findOne({ where: { id: id } });
			if (params.username){
				const username = await Users.findOne({ where: { username: params.username } });
				if (username !== null) {
					throw new Error("login is busy");
				}
			}
			if (params.password){
				params.password = await argon2.hash(params.password);
			}
			if (params.phone){
				const phone = await Users.findOne({ where: { phone: params.phone } });
				if (phone) {
					throw new Error("phone is busy");
				}
			}
			if (params.email){
				const email = await Users.findOne({ where: { email: params.email } });
				if (email) {
					throw new Error("email is busy");
				}
			}
			return user.update({...params});
		}
		static async deleteUserById(id){
			return await Users.destroy({ where: { id: id } });
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

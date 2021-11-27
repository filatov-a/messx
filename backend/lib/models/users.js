const Base = require("./base");
const argon2 = require("argon2");

class Users extends Base {
	static modelSchema = {
			username: this.DT.STRING,
			password: this.DT.STRING,
			full_name: this.DT.STRING,
			gender: this.DT.ENUM(["male", "female"]),
			email: this.DT.STRING,
			profile_picture: this.DT.STRING,
			rating: this.DT.INTEGER,
			phone: this.DT.STRING,
			card: this.DT.STRING,
			role: this.DT.ENUM(["user", "admin", "superAdmin"]),
			isVerified: this.DT.BOOLEAN,
			isActive: this.DT.BOOLEAN,
	}

	static modelName = "Users";

	static associate(models) {
		this.hasMany(models.Posts, { foreignKey: "userId", onDelete: "cascade"});
		this.hasMany(models.LikesComments, { foreignKey: "userId", onDelete: "cascade"});
		this.hasMany(models.LikesPosts, { foreignKey: "userId", onDelete: "cascade"});
		this.belongsToMany(models.Chats, {
			through: "UsersT0Chats",
			foreignKey: "userId",
			onDelete: "cascade",
		});
		this.belongsToMany(this, {
			through: "UsersToFollowers",
			as: "users",
			foreignKey: "userId",
			onDelete: "set null",
		});
		this.belongsToMany(this, {
			through: "UsersToFollowers",
			as: "followers",
			foreignKey: "followerId",
			onDelete: "set null",
		});
	}
	static async createUser(params){
		const username = await this.findOne({ where: { username: params.username } });
		const email = await this.findOne({ where: { email: params.email } });
		if (username) {
			throw new Error("username is busy");
		}
		if (email) {
			throw new Error("email is busy");
		}
		return this.create({...params});
	}
	static async updateUser({id, params}){
		const user = await this.findOne({ where: { id: id } });
		if (params.username){
			const username = await this.findOne({ where: { username: params.username } });
			if (username !== null) {
				throw new Error("login is busy");
			}
		}
		if (params.password){
			params.password = await argon2.hash(params.password);
		}
		if (params.phone){
			const phone = await this.findOne({ where: { phone: params.phone } });
			if (phone) {
				throw new Error("phone is busy");
			}
		}
		if (params.email){
			const email = await this.findOne({ where: { email: params.email } });
			if (email) {
				throw new Error("email is busy");
			}
		}
		return user.update({...params});
	}
}

module.exports = Users;

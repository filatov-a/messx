import Base from "./base.mjs";
import argon2 from "argon2";

export default class Users extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
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
		Users.hasMany(models.Posts, { foreignKey: "userId", onDelete: "cascade"});
		Users.hasMany(models.Messages, { foreignKey: "userId", onDelete: "cascade"});
		Users.hasMany(models.LikesComments, { foreignKey: "userId", onDelete: "cascade"});
		Users.hasMany(models.LikesPosts, { foreignKey: "userId", onDelete: "cascade"});
		Users.belongsToMany(models.Chats, {
			through: "UsersToChats",
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

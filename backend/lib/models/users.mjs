import Base from "./base.mjs";
import argon2 from "argon2";

export default class Users extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		password: this.DT.STRING,
		full_name: this.DT.STRING,
		gender: this.DT.ENUM(["male", "female"]),
		email: this.DT.STRING,
		profile_picture: this.DT.STRING,
		rating: this.DT.INTEGER,
		role: this.DT.ENUM(["user", "admin", "superAdmin"]),
		status: this.DT.STRING,
	}

	static modelName = "Users";

	static associate(models) {
		Users.hasMany(models.Posts, { foreignKey: "userId", onDelete: "cascade"});
		Users.hasMany(models.Messages, { foreignKey: "userId", onDelete: "cascade"});
		Users.hasMany(models.LikesPosts, { foreignKey: "userId", onDelete: "cascade"});
		Users.belongsToMany(models.Chats, {
			through: "UsersToChats",
			foreignKey: "userId",
			onDelete: "cascade",
		});
		Users.belongsToMany(Users, {
			through: "UsersToUsers",
			as: "followers",
			foreignKey: "userId",
			onDelete: "set null",
		});
		Users.belongsToMany(Users, {
			through: "UsersToUsers",
			as: "follow",
			foreignKey: "followerId",
			onDelete: "set null",
		});
		Users.belongsToMany(models.Posts, {
			through: "UsersToPosts",
			as: "repost",
			foreignKey: "userId",
			onDelete: "cascade",
		});
	}
	static async createUser(params){
		let errors = {};
		const username = await this.findOne({ where: { id: params.id } });
		const email = await this.findOne({ where: { email: params.email } });
		if (username) {
			errors.id = "id is busy";
		}
		if (email) {
			errors.email = "email is busy";
		}
		if (Object.keys(errors).length){
			throw errors;
		}
		return this.create({...params});
	}

	static async updateUser({id, params}){
		const user = await this.findOne({ where: { id: id } });
		let errors = {};
		if (params.id){
			const username = await this.findOne({ where: { id: params.id } });
			if (username !== null) {
				errors.id = "username is busy";
			}
		}
		if (params.email){
			const email = await this.findOne({ where: { email: params.email } });
			if (email) {
				errors.email = "email is busy";
			}
		}

		if (params.password){
			params.password = await argon2.hash(params.password);
		}

		if (Object.keys(errors).length){
			throw errors
		}

		return user.update({...params});
	}
}

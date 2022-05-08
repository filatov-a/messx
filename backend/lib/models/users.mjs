import Base from "./base.mjs";
import argon2 from "argon2";
import randomWords from "random-words";

export default class Users extends Base {
	static modelSchema = {
		id: { type: this.DT.UUID, defaultValue: this.DT.UUIDV4, primaryKey: true },
		password: this.DT.STRING,
		full_name: this.DT.STRING,
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
			as: "following",
			foreignKey: "followerId",
			onDelete: "set null",
		});
	}
	static async createUser(params){
		let errors = {};
		if (Object.keys(errors).length){
			throw errors;
		}
		return this.create({...params});
	}

	static async updateUser({id, params}){
		let {password, full_name} = params;
		const user = await this.findOne({ where: { id: id } });
		let errors = {};

		let obj = {};

		if (password){
			password = randomWords({min: 20, max: 40, join: "-"});
			obj.password = await argon2.hash(password);
		}
		if (full_name){
			obj.full_name = full_name
		}

		if (Object.keys(errors).length){
			throw errors
		}

		const userUpdate = await user.update({...obj});

		return {user: userUpdate, updateData: {password, full_name}};
	}
}

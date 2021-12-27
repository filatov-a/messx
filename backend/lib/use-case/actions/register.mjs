import Base from "../base.mjs";
import Users from "../../models/users.mjs";

import jwt from "jsonwebtoken";
import mail from "../../utils/email.mjs";
import argon2  from "argon2";

export default class register extends Base {
	async livrValidate(data = {}) {
		const rules = {
			username   : [ "required", "string"],
			password	: [	"required", "string"],
			full_name	: [	"required", "string"],
			email	: [	"required", "string"],
			gender	: [	"required", "string"],
		};

		return this.doValidation(data, rules);
	}

	async execute({data}){
		data.password = await argon2.hash(data.password);
		data.profile_picture = `defaultUser-${data.gender}.png`;
		const usr = {
			username: data.usersname,
			password: data.password,
			full_name: data.full_name,
			email: data.email,
			gender: data.gender
		};
		const usrDb = await Users.createUser({...usr});
		const token = await jwt.sign({id: usrDb.id}, this.config.token.accessToken, {expiresIn: "1h"});
		const url = `http://localhost:3000/verify-email/${token}`;

		await mail(data.email, url, "click to verify account", "");

		return {token};
	}
}

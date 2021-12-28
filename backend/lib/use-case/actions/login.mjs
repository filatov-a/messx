import Base from "../base.mjs";
import Users from "../../models/users.mjs";

import jwt from "jsonwebtoken";
import argon2  from "argon2";

export default class login extends Base {
	async execute({data}){
		const user = await Users.findOne({where: {username: data.username}});
		let errors = {};

		if (user === null) throw ({username: "username is wrong"});
		const ok = await argon2.verify(user.password, data.password);
		if (!ok) errors.password = "wrong account password";
		if (!user.isVerified) errors.error = "u must to verify account";

		if (Object.keys(errors).length){
			throw errors;
		}

		const token = await jwt.sign({id: user.id},
			this.config.token.accessToken, {expiresIn: "7d"});

		return {user, token};
	}
}

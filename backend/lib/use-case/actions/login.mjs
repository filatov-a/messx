import Base from "../base.mjs";
import Users from "../../models/users.mjs";

import jwt from "jsonwebtoken";
import argon2  from "argon2";

export default class login extends Base {
	async execute({data}){
		const user = await Users.findOne({where: {id: data.id}});
		let errors = {};

		if (user === null) throw ({id: "id is wrong"});
		const ok = await argon2.verify(user.password, data.password);
		if (!ok) errors.password = "wrong account password";
		if (user.status === "unverified") errors.error = "u must verify account";
		if (Object.keys(errors).length){
			throw errors;
		}

		const token = await jwt.sign({id: user.id},
			this.config.token.accessToken, {expiresIn: "7d"});

		console.log(token);

		return {user, token};
	}
}

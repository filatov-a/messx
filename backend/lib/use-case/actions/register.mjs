import Base from "../base.mjs";
import Users from "../../models/users.mjs";

import jwt from "jsonwebtoken";
import mail from "../../utils/email.mjs";
import argon2  from "argon2";
import schemas from "../../utils/schemas.mjs";

export default class register extends Base {
	constructor() {
		super();
		this.validateSchema = schemas.user_schema;
	}

	async execute({data}){
		data.password = await argon2.hash(data.password);
		data.profile_picture = `defaultUser-${data.gender}.png`;
		const usr = {
			username: data.usersname,
			password: data.password,
			email: data.email,
			gender: data.gender
		};
		const usrDb = await Users.createUser(usr);
		const token = await jwt.sign({id: usrDb.id}, this.config.token.accessToken, {expiresIn: "1h"});
		const url = `http://localhost:3000/verify-email/${token}`;

		await mail(data.email, url, "click to verify account", "");

		return {token};
	}
}

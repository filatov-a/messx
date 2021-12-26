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

	async execute(params){
		params.body.password = await argon2.hash(params.body.password);
		params.body.profile_picture = `defaultUser-${params.body.gender}.png`;
		const usrDb = await Users.createUser({...params.body});
		const token = await jwt.sign({id: usrDb.id}, this.config.token.verifyEmailToken, {expiresIn: "1h"});
		const url = `http://localhost:3000/verify-email/${token}`;

		await mail(params.body.email, url, "click to verify account", "");

		return {token};
	}
}

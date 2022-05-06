import Base from "../base.mjs";
import Users from "../../models/users.mjs";

import jwt from "jsonwebtoken";
import mail from "../../utils/email.mjs";
import argon2  from "argon2";
import randomWords from "random-words";
import { v4 as uuidv4 } from "uuid";

export default class register extends Base {
	async livrValidate(data = {}) {
		const rules = {
			full_name	: [	"required", "string", { min_length: 1, max_length: 20}],
		};

		return this.doValidation(data, rules);
	}

	async execute({data}){
		const password = randomWords({min: 20, max: 40, join: "-"});
		const id = uuidv4();
		data.password = await argon2.hash(password);
		data.profile_picture = `defaultUser-${data.gender}.png`;
		const usrDb = await Users.createUser({
			id,
			password: data.password,
			full_name: data.full_name,
		});
		const token = await jwt.sign({id: usrDb.id}, this.config.token.accessToken, {expiresIn: "1h"});
		const url = `http://localhost:3000/verify-register/${token}`;

		return {token, password, id};
	}
}

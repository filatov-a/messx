import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class login extends Base {
	static async execute(params){
		const user = await Users.findOne({where: {username: params.body.username}});

		if (user === null) {
			throw new Error("wrong account login");
		}

		const ok = await this.argon2.verify(user.password, params.body.password);

		if (!ok) {
			throw new Error("wrong account password");
		}

		if (!user.isVerified) {
			throw new Error("u must to verify account");
		}

		return this.jwt.sign({id: user.id},
			this.config.token.accessToken, {expiresIn: "7d"});
	}
}

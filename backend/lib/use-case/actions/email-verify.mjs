import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import jwt from "jsonwebtoken";

export default class emailVerify extends Base {
	async execute(params){
		const decoded = await jwt.verify(params.token, this.config.token.verifyEmailToken);
		const usrDb = await Users.findOne({where: {id: decoded.id}});
		await usrDb.update({isVerified: true});
	}
}


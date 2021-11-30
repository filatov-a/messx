import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class emailVerify extends Base {
	static async execute(params){
		const decoded = await this.jwt.verify(params.token, this.config.token.verifyEmailToken);
		const usrDb = await Users.findOne({where: {id: decoded.id}});
		await usrDb.update({isVerified: true});
	}
}


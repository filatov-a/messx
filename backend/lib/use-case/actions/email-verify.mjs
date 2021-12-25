import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class emailVerify extends Base {
	async execute(params){
		const decoded = await this.decodeToken(params.token);
		const usrDb = await Users.findOne({where: {id: decoded.id}});
		await usrDb.update({isVerified: true});
	}
}


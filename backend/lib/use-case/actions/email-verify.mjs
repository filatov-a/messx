import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class emailVerify extends Base {
	async execute({body, context}){
		const usrDb = await Users.findOne({where: {id: context.userId}});
		await usrDb.update({status: "verified"});
	}
}


import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Chats from "../../models/chats.mjs";

export default class Create extends Base {
	static async execute(params){
		const decode = await this.jwt.verify(params.token, this.config.token.accessToken);
		const usrDb = await Users.findOne({where: {id: decode.id}});
		if (!usrDb) throw new Error("user didn't actions! Incorrect token");
		const schema = {
			name: params.body.name,
			userId: usrDb.id,
		};
		const newChats = await Chats.create(schema);

		return {newChats};
	}
}

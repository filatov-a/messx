import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Chats from "../../models/chats.mjs";
import UsersToChats from "../../models/users-to-chats.mjs";

import jwt from "jsonwebtoken";

export default class Create extends Base {
	async execute(params){
		const decode = await jwt.verify(params.token, this.config.token.accessToken);
		const usrDb = await Users.findOne({where: {id: decode.id}});
		if (!usrDb) throw new Error("user didn't actions! Incorrect token");
		const schema = {
			name: params.body.name,
			userId: usrDb.id,
		};
		const newChat = await Chats.create(schema);

		await UsersToChats.create({
			userId: decode.id,
			chatId: newChat.id,
			isAdmin: true
		});

		return {newChat};
	}
}

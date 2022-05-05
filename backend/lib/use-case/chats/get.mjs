import Base from "../base.mjs";
import Chats from "../../models/chats.mjs";
import Messages from "../../models/messages.mjs";
import Users from "../../models/users.mjs";

export default class Get extends Base {
	async execute({data}){
		const chat = await Chats.findOne({
			where: {id: data.id},
			include: [
				{
					model: Messages,
					include: [{model: Users}]
				}
			],
		});
		if (!chat) throw new Error("event didn't found! Incorrect id");

		return chat;
	}
}

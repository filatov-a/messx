import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Chats from "../../models/chats.mjs";
import UsersToChats from "../../models/users-to-chats.mjs";

export default class Create extends Base {
	async execute({data}){
		if (!data.context.userId) throw new Error("user didn't actions! Incorrect token");
		const schema = {
			name: data.body.name,
			userId: data.context.userId,
		};
		const newChat = await Chats.create(schema);

		await UsersToChats.create({
			userId: data.context.userId,
			chatId: newChat.id,
			isAdmin: true
		});

		return newChat;
	}
}

import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Chats from "../../models/chats.mjs";
import UsersToChats from "../../models/users-to-chats.mjs";

export default class Create extends Base {
	async execute({data, context}){
		const schema = {
			name: data.name,
			userId: context.userId,
		};
		const newChat = await Chats.create(schema);

		await UsersToChats.create({
			userId: context.userId,
			chatId: newChat.id,
			isAdmin: true
		});

		return newChat;
	}
}

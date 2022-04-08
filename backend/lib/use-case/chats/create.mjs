import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Chats from "../../models/chats.mjs";
import UsersToChats from "../../models/users-to-chats.mjs";
import ChatsToCategories from "../../models/chats-to-categories.mjs";

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

		for (let i in data.users){
			await UsersToChats.create({
				userId: data.users[i],
				chatId: newChat.id,
				isAdmin: false
			});
		}

		for (let i in data.categories){
			await ChatsToCategories.create({
				categoryId: data.categories[i],
				chatId: newChat.id,
			});
		}

		return newChat;
	}
}

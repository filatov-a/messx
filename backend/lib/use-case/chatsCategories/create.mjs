import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";
import ChatsToCategories from "../../models/chats-to-categories.mjs";

export default class Create extends Base {
	async execute({data}){
		const category = await ChatsCategories.create({
			title: data.title,
			description: data.description
		});

		await ChatsToCategories.create({
			chatId: data.id,
			categoryId: category.id
		});

		return {category};
	}
}

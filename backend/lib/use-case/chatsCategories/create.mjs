import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";
import ChatsToCategories from "../../models/chats-to-categories.mjs";

export default class Create extends Base {
	async execute({data}){
		const category = await ChatsCategories.create({
			title: data.body.title,
			description: data.body.description
		});

		await ChatsToCategories.create({
			chatId: data.params.id,
			categoryId: category.id
		});

		return {category};
	}
}

import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";
import ChatsToCategories from "../../models/chats-to-categories.mjs";

export default class Create extends Base {
	async execute(params){
		const category = await ChatsCategories.create({
			title: params.body.title,
			description: params.body.description
		});

		await ChatsToCategories.create({
			chatId: params.params.id,
			categoryId: category.id
		});

		return {category};
	}
}

import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";

export default class Update extends Base {
	async execute({data}){
		const one = await ChatsCategories.findByPk(data.id);
		const category = await one.update({
			title: data.title,
			description: data.description
		});

		return {category};
	}
}

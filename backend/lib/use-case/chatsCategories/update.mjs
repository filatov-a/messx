import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";

export default class Update extends Base {
	async execute({data}){
		const one = await ChatsCategories.findByPk(data.params.id);
		const category = await one.update({
			title: data.body.title,
			description: data.body.description
		});

		return {category};
	}
}

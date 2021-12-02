import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";

export default class Update extends Base {
	async execute(params){
		const one = await ChatsCategories.findByPk(params.params.id);
		const category = await one.update({
			title: params.body.title,
			description: params.body.description
		});

		return {category};
	}
}

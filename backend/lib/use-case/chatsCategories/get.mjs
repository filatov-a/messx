import Base from "../base.mjs";
import Chats from "../../models/chats.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";

export default class Get extends Base {
	async execute(params){
		const categories = ChatsCategories;
		const {id} = params.params;
		const category = await categories.findOne({
			where: {id: id},
			include: Chats
		});

		return {category};
	}
}

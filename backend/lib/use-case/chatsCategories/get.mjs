import Base from "../base.mjs";
import Chats from "../../models/chats.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";

export default class Get extends Base {
	async execute({data}){
		const categories = ChatsCategories;
		const {id} = data;
		const category = await categories.findOne({
			where: {id: id},
			include: {
				model: Chats,
				order: ["createdAt", "DESC"]
			}
		});

		return {category};
	}
}

import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";

export default class GetAll extends Base {
	async execute(params){
		const categories = await ChatsCategories.findAll();
		return {categories};
	}
}

import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";

export default class Delete extends Base {
	async execute(params){
		const one = await ChatsCategories.destroy({
			where: {
				id: params.id
			},
		});
		if (!one) throw new Error("ChatsCategory didn't found! Incorrect id!");

		return {one};
	}
}

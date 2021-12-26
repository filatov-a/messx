import Base from "../base.mjs";
import ChatsCategories from "../../models/chats-categories.mjs";

export default class Delete extends Base {
	async execute({data}){
		const one = await ChatsCategories.destroy({
			where: {
				id: data.id
			},
		});
		if (!one) throw new Error("ChatsCategory didn't found! Incorrect id!");

		return {one};
	}
}

import Base from "../base.mjs";
import Chats from "../../models/chats.mjs";

export default class Delete extends Base {
	async execute({data}){
		const one = await Chats.destroy({
			where: {
				id: data.params.id
			},
		});
		if (!one) throw new Error("event didn't found! Incorrect id!");

		return {one};
	}
}

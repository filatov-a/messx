import Base from "../base.mjs";
import Messages from "../../models/messages.mjs";

export default class Delete extends Base {
	async execute(params){
		const {id} = params.params.body;
		const one = await Messages.destroy({
			where: {
				id: id
			},
		});
		if (!one) throw new Error("Messages didn't found! Incorrect id!");

		return {one};
	}
}

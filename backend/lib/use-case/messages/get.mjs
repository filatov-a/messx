import Base from "../base.mjs";
import Messages from "../../models/messages.mjs";

export default class Get extends Base {
	async execute(params){
		const {id} = params.body;
		const one = await Messages.findOne({where: {id: id}});
		if (!one) throw new Error("Message didn't found! Incorrect id");
		return {one};
	}
}

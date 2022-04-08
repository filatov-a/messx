import Base from "../base.mjs";
import Chats from "../../models/chats.mjs";
// import Messages from "../../models/messages.mjs";

export default class Get extends Base {
	async execute({data}){
		const chats = await Chats.findAll({
			// where: {id: data.id},
			// include: Messages,
		});
		return chats;
	}
}

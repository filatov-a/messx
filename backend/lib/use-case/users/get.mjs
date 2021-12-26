import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Chats from "../../models/chats.mjs";
import Messages from "../../models/messages.mjs";

export default class Get extends Base {
	async execute({data}){
		const {id} = data.params;
		return Users.findOne({
			where: {id: id},
			include: [
				{association: "followers"},
				{association: "follow"},
				{model: Chats},
				{model: Messages},
			]
		});
	}
}

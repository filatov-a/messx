import Base from "../base.mjs";
import Messages from "../../models/messages.mjs";

export default class Update extends Base {
	async execute({data}){
		const mess = await Messages.findByPk(data.id);
		const newMessages = await mess.update({
			name: data.name,
			descriptions: data.descriptions,
		});
		return {newMessages};
	}
}

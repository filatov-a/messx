import Base from "../base.mjs";
import Messages from "../../models/messages.mjs";

export default class Update extends Base {
	async execute(params){
		const mess = await Messages.findByPk(params.params.id);
		const newMessages = await mess.update({
			name: params.body.name,
			descriptions: params.body.descriptions,
		});
		return {newMessages};
	}
}

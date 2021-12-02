import Base from "../base.mjs";
import Messages from "../../models/messages.mjs";

export default class Create extends Base {
	async execute(params){
		const { id } = params.params;
		const schema = {
			name: params.body.name,
			descriptions: params.body.descriptions,
			chatId: id,
		};
		const message = await Messages.create(schema);

		return {message};
	}
}

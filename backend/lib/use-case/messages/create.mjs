import Base from "../base.mjs";
import Messages from "../../models/messages.mjs";
import MessagesImages from "../../models/messages-images.mjs";

export default class Create extends Base {
	async execute(params){
		const { id } = params.params;
		const schema = {
			name: params.body.name,
			descriptions: params.body.descriptions,
			chatId: id,
		};
		const message = await Messages.create(schema);
		params.body.images.map(async i => {
			const image = await MessagesImages.findOne({where: {id: i.id}});
			await message.addMessagesImages(image);
		});

		return {message};
	}
}

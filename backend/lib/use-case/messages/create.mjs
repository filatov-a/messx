import Base from "../base.mjs";
import Messages from "../../models/messages.mjs";
import MessagesImages from "../../models/messages-images.mjs";

export default class Create extends Base {
	async execute({data}){
		const { id } = data.params;
		const schema = {
			name: data.body.name,
			descriptions: data.body.descriptions,
			chatId: id,
		};
		const message = await Messages.create(schema);
		data.body.images.map(async i => {
			const image = await MessagesImages.findOne({where: {id: i.id}});
			await message.addMessagesImages(image);
		});

		return {message};
	}
}

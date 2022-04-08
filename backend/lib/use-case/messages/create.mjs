import Base from "../base.mjs";
import Messages from "../../models/messages.mjs";
import MessagesImages from "../../models/messages-images.mjs";

export default class Create extends Base {
	async execute({data}){
		const { chatId, title, descriptions, userId } = data;
		const schema = {
			title,
			descriptions,
			chatId,
			userId,
			isActive: true
		};
		const message = await Messages.create(schema);
		data.images?.map(async i => {
			const image = await MessagesImages.findOne({where: {id: i.id}});
			await message.addMessagesImages(image);
		});
		return message;
	}
}

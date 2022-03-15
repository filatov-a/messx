import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Chats from "../../models/chats.mjs";
import Messages from "../../models/messages.mjs";

export default class Get extends Base {
	async execute({data, context}){
		const {id} = data;
		const {userId} = context;
		let users = await Users.findOne({
			where: {id: id},
			include: [
				{association: "followers"},
				{association: "following"},
				{model: Chats},
				{model: Messages},
			],
		});

		const arrKeysFollowers = users.followers.map(i => i.id);
		const arrKeysFollowing = users.following.map(i => i.id);

		users.dataValues.userFollower = arrKeysFollowers.includes(userId);
		users.dataValues.userFollow = arrKeysFollowers.includes(userId);

		return users;
	}
}

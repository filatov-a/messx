import Base from "../base.mjs";
import UsersToUsers from "../../models/users-to-users.mjs";

export default class Follow extends Base {
	async execute({data, context}){
		const {id} = data;
		const {userId} = context;

		const prev = await UsersToUsers.findOne({
			where: {
				userId: id,
				followerId: userId,
			}
		});

		if (prev) {
			await UsersToUsers.destroy({
				where: {
					userId: id,
					followerId: userId,
				}
			});
			return {dFollow: context.userInstance};
		}
		else {
			const nFollow = await UsersToUsers.create({
				userId: id,
				followerId: userId,
			});
			return {follow: context.userInstance};
		}
	}
}

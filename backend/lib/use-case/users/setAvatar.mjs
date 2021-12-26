import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Update extends Base {
	async execute({data, context}){
		const avatar = data.filename;
		const user = await Users.updateUser({
			id: context.userId,
			params: { profile_picture: avatar }
		});
		return {user};
	}
}

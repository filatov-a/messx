import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Update extends Base {
	async execute({file, data, context}){
		const avatar = file.filename;
		const user = await Users.updateUser({
			id: context.userId,
			params: { profile_picture: avatar }
		});
		return {user};
	}
}

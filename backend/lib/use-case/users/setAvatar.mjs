import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Update extends Base {
	async execute(params){
		const avatar = params.file.filename;
		const decode = await this.decodeToken(params.token);
		const user = await Users.updateUser({
			id: decode.id,
			params: { profile_picture: avatar }
		});
		return {user};
	}
}

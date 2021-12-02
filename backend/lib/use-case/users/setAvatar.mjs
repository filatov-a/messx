import Base from "../base.mjs";
import Users from "../../models/users.mjs";

import jwt from "jsonwebtoken";

export default class Update extends Base {
	async execute(params){
		const avatar = params.file.filename;
		const decode = await jwt.verify(params.token, this.config.token.accessToken);
		const user = await Users.updateUser({
			id: decode.id,
			params: { profile_picture: avatar }
		});
		return {user};
	}
}

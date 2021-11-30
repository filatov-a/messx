import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Update extends Base {
	static async execute(params){
		const avatar = params.avatar;
		const decode = await this.jwt.verify(params.token, this.config.token.accessToken);
		const user = await Users.updateUser({
			id: decode.id,
			params: { profile_picture: avatar }
		});
		return {user};
	}
}

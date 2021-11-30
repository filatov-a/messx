import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Update extends Base {
	static async execute(params){
		const {id} = params.params;
		const update = await Users.updateUser({
			id: id,
			params: params.body
		});
		return {update};
	}
}

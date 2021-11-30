import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Create extends Base {
	static async execute(params){
		params.body["isVerified"] = true;
		const user = await Users.createUser(params.body);
		return {user};
	}
}

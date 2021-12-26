import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Create extends Base {
	async execute({data}){
		const usr = {
			username: data.usersname,
			password: data.password,
			email: data.email,
		};
		usr.isVerified = true;
		const user = await Users.createUser(usr);
		return {user};
	}
}

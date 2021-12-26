import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Update extends Base {
	async execute({data}){
		const {id} = data;
		const update = await Users.updateUser({
			id: id,
			params: data
		});
		return update;
	}
}

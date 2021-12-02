import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Delete extends Base {
	async execute(params){
		const { id } = params.params;
		const user = await Users.destroy({ where: { id: id } });
		return {user};
	}
}

import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class Delete extends Base {
	async execute({data}){
		const { id } = data;
		const user = await Users.destroy({ where: { id: id } });
		return {user};
	}
}

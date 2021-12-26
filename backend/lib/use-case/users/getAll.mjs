import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class GetAll extends Base {
	async execute({data}){
		const {limit, offset} = data;
		const all = await Users.findAndCountAll({
			limit: limit,
			offset: offset,
		});
		return {users: all.rows, count: all.count};
	}
}

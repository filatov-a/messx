import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class GetAll extends Base {
	async execute(params){
		const {limit, offset} = params.query;
		const all = await Users.findAndCountAll({
			limit: limit,
			offset: offset,
		});
		return {users: all.rows, count: all.count};
	}
}

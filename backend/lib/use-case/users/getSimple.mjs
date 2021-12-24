import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class GetSimple extends Base {
	async execute(params){
		const {id} = params.params;
		return Users.findOne({
			where: {id: id},
		});
	}
}

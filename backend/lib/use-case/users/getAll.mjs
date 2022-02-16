import Base from "../base.mjs";
import Users from "../../models/users.mjs";

export default class GetAll extends Base {
	async execute({data}){
		const {limit, offset} = data;
		const limitInt = parseInt(limit);
		const offsetInt = parseInt(offset);

		const all = await Users.findAndCountAll({
			include: [{association: "followers"}],
			attributes: {
				include: [
					[
						this.sequelize.literal(`(
			        		SELECT COUNT(*)
			        		FROM UsersToFollowers
			       			WHERE
			            		UsersToFollowers.followerId = Users.id
			    			)`), "followersCount"
					],
				]
			},
			limit: limitInt,
			offset: offsetInt,
			order: [[this.sequelize.literal("followersCount"), "asc"], ["createdAt", "DESC"]]
		});
		return {users: all.rows, count: all.count};
	}
}

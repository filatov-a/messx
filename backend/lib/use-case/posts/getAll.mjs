import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import pkg from "sequelize";
import moment from "moment";

const { Op } = pkg;

export default class GetAll extends Base {
	async execute(params){
		const interval = params.interval ? params.interval : 1;
		const {limit, offset} = params.query;

		const limitInt = parseInt(limit);
		const offsetInt = parseInt(offset);
		// let {title} = params.query;
		// if (title === "undefined") title = "";
		// console.log(this.sequelize);
		const all = await Posts.findAndCountAll({
			where: {
				createdAt: {
					[Op.gte]: moment().subtract(interval, "days").toDate()
				}
			},
			attributes: {
				include: [
					[
						this.sequelize.literal(`(
			        		SELECT COUNT(*)
			        		FROM LikesPosts
			       			WHERE
			            		LikesPosts.postId = Posts.id
			    			)`), "likesCount"
					]
				]
			},
			limit: limitInt,
			offset: offsetInt,
			include: [
				{model: LikesPosts},
				{model: Users}
			],

			order: [[this.sequelize.literal("likesCount"), "DESC"], ["updatedAt", "DESC"]]
		});

		return {posts: all.rows, count: all.count};
	}
}

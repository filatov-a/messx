import Base from "../base.mjs";
import {Op} from "sequelize";
import Posts from "../../models/posts.mjs";

export default class GetAll extends Base {
	async execute(params){
		const {limit, offset} = params.query;
		let {title} = params.query;
		if (title === "undefined") title = "";

		const all = await Posts.findAndCountAll({
			limit: limit,
			offset: offset,
			where: {
				title: {
					[Op.like]: `%${title}%`
				}
			}
		});

		return {posts: all.rows, count: all.count};
	}
}

import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import pkg from "sequelize";
import moment from "moment";
import PostsCategories from "../../models/posts-categories.mjs";

const { Op } = pkg;

export default class GetAllDay extends Base {
	async execute({data, context}){
		const interval = data.interval ? data.interval : 1;
		const {limit, offset} = data;

		const limitInt = parseInt(limit);
		const offsetInt = parseInt(offset);

		// let {title} = params.query;
		// if (title === "undefined") title = "";
		// console.log(this.sequelize);

		const attributes = {
			attributes: {
				include: [
					[
						this.sequelize.literal(`(
							SELECT COUNT(*)
							FROM LikesPosts
							WHERE
							LikesPosts.postId = Posts.id
						)`), "likesCount"
					],
					[
						this.sequelize.literal(`(
							SELECT
							FROM LikesPosts
							WHERE
							LikesPosts.userId = "${context.userId}"
							AND
							LikesPosts.postId = Posts.id
						)`), "userLike"
					],
				]
			},
		};

		const all = await Posts.findAndCountAll({
			where: {
				createdAt: {
					[Op.gte]: moment().subtract(interval, "days").toDate()
				}
			},
			include: [
				{model: PostsCategories},
				{model: LikesPosts},
				{model: Users},
				{association: "questions"},
				{association: "answers"},
			],
			attributes,
			limit: limitInt,
			offset: offsetInt,
			order: [[this.sequelize.literal("likesCount"), "DESC"], ["createdAt", "DESC"]]
		});

		return {posts: all.rows, count: all.count};
	}
}

import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import pkg from "sequelize";
import moment from "moment";
import PostsCategories from "../../models/posts-categories.mjs";
import Chats from "../../models/chats.mjs";
import Messages from "../../models/messages.mjs";
// import users from "../../api/routes/controlers/users.mjs";

const { Op } = pkg;

export default class GetAll extends Base {
	async execute({data, context}){
		const interval = data.interval ? data.interval : 1;
		const {limit, offset} = data;

		const limitInt = parseInt(limit);
		const offsetInt = parseInt(offset);

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

		const user = await Users.findOne({
			where: {id: context.userId},
			include: [
				{
					association: "follow",
					include: [
						{
							model: Posts,
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
							order: [["createdAt", "DESC"]]
						},
					]
				},
			]
		});
		
		let cnt = 0;
		let posts = [];
		for (let i = 0; i < user.follow.length; i++){
			for (let j = 0; j < user.follow[i]?.Posts.length; j++){
				posts.push(user.follow[i].Posts[j]);
				cnt++;
			}
		}

		return {posts: posts, count: cnt};
	}
}

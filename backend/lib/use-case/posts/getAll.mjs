import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import pkg from "sequelize";
import moment from "moment";
import PostsCategories from "../../models/posts-categories.mjs";
import Chats from "../../models/chats.mjs";
import Messages from "../../models/messages.mjs";
import {addUserLike} from "../utils/addUserLike.mjs";
// import users from "../../api/routes/controlers/users.mjs";

const { Op } = pkg;

export default class GetAll extends Base {
	async execute({data, context}){
		const interval = data.interval ? data.interval : 1;
		const {limit, offset} = data;

		const limitInt = parseInt(limit);
		const offsetInt = parseInt(offset);

		const user = await Users.findOne({
			where: {id: context.userId},
			include: [
				{
					association: "following",
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
								{
									model: LikesPosts,
									include: [{model: Users}]
								},
								{model: Users},
								{association: "questions"},
								{association: "answers"},
							],
							limit: limitInt,
							offset: offsetInt,
							order: [["createdAt", "DESC"]]
						},
					]
				},
			]
		});
		
		let posts = [];
		for (let i = 0; i < user.following.length; i++){
			for (let j = 0; j < user.following[i]?.Posts.length; j++){
				posts.push(user.following[i].Posts[j]);
			}
		}

		addUserLike(posts, context);

		return posts;
	}
}

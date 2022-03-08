import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Posts from "../../models/posts.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import {addUserLike} from "../utils/addUserLike.mjs";

export default class Get extends Base {
	async execute({data, context}){
		const {id, limit, offset} = data;

		const limitInt = parseInt(limit);
		const offsetInt = parseInt(offset);

		const user = await Users.findOne({
			where: {id: id},
			include: [
				{
					model: Posts,
					include: [
						{association: "questions"},
						{association: "answers"},
						{model: PostsCategories},
						{
							model: LikesPosts,
							include: [{model: Users}]
						},
						{model: Users},
					],
					limit: limitInt,
					offset: offsetInt,
					order: [["updatedAt", "DESC"]]
				},
			],
		});

		addUserLike(user.Posts, context);
		return user.Posts;
	}
}

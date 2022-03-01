import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import {addUserLike} from "../utils/addUserLike.mjs";

export default class Get extends Base {
	async execute({data, context}){
		const {id} = data;

		const post = await Posts.findOne({
			where: {id: id},
			include: [
				{model: PostsCategories},
				{
					model: LikesPosts,
					include: [{model: Users}]
				},
				{model: Users},
				{
					association: "questions",
					include: [
						{
							model: LikesPosts,
							include: [{model: Users}]
						},
						{model: Users},
						{association: "questions"},
						{association: "answers"},
					],
				},
				{
					association: "answers",
					include: [
						{
							model: LikesPosts,
							include: [{model: Users}]
						},
						{model: Users},
						{association: "questions"},
						{association: "answers"},
					],
				},
			],
		});

		addUserLike(post, context);
		addUserLike(post.questions, context);
		addUserLike(post.answers, context);

		return post;
	}
}

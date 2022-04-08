import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import Users from "../../models/users.mjs";
import {addUserLike} from "../utils/addUserLike.mjs";

export default class GetPosts extends Base {
	async execute({data, context}){
		const {id} = data;
		const category = await PostsCategories.findOne({
			where: {id: id},
			include: [
				{
					model: Posts,
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
				}
			]
		});

		addUserLike(category.Posts, context);
		return category.Posts;
	}
}

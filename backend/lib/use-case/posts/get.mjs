import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import LikesPosts from "../../models/likes-posts.mjs";

export default class Get extends Base {
	async execute({data, context}){
		const {id} = data;

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

		const post = await Posts.findOne({
			where: {id: id},
			include: [
				{model: PostsCategories},
				{model: LikesPosts},
				{model: Users},
				{
					association: "questions",
					include: [
						{model: LikesPosts},
						{model: Users},
						{association: "questions"},
						{association: "answers"},
					],
					attributes
				},
				{
					association: "answers",
					include: [
						{model: LikesPosts},
						{model: Users},
						{association: "questions"},
						{association: "answers"},
					],
					attributes
				},
			],
			attributes
		});
		// console.log(post);
		return post;
	}
}

import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Posts from "../../models/posts.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

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

		const users = await Users.findOne({
			where: {id: id},
			include: [
				{
					model: Posts,
					include: [
						{association: "questions"},
						{association: "answers"},
						{model: PostsCategories},
						{model: LikesPosts},
						{model: Users},
					],
					attributes,
					order: [["updatedAt", "DESC"]]
				},
			]
		});
		return users.Posts;
	}
}

import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import PostsToCategories from "../../models/posts-to-categories.mjs";
import PostsImages from "../../models/posts-images.mjs";
import PostsToPosts from "../../models/posts-to-posts.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import Users from "../../models/users.mjs";

export default class Create extends Base {
	async livrValidate(data = {}) {
		const rules = {
			title   : [ "required", "string"],
			content	: [	"required", "string"],
		};

		return this.doValidation(data, rules);
	}

	async execute({data, context}){
		const post = await Posts.create({
			title: data.title,
			status: "live",
			content: data.content,
			userId: context.userId
		});
		if (data.postId){
			await PostsToPosts.create({
				postId: data.postId,
				questionId: post.id
			});
		}

		for (const i of data.categories){
			await PostsToCategories.create({
				postId: post.id,
				categoryId: i
			});
		}

		// data?.images?.map(async i => {
		// 	const image = await PostsImages.findOne({where: {id: i.id}});
		// 	await PostsImages.create()
		// 	await post.addPostsImages(image);
		// });

		const postN = Posts.findOne({
			where: {
				id: post.id
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
		});

		return postN;
	}
}

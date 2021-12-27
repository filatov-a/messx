import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import PostsToCategories from "../../models/posts-to-categories.mjs";
import PostsImages from "../../models/posts-images.mjs";

export default class Create extends Base {
	async livrValidate(data = {}) {
		const rules = {
			title   : [ "required", "string"],
			content	: [	"required", "string"]
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

		// data?.images?.map(async i => {
		// 	const image = await PostsImages.findOne({where: {id: i.id}});
		// 	await PostsImages.create()
		// 	await post.addPostsImages(image);
		// });

		data.categories?.map(async i => {
			const category = await PostsCategories.findOne({where: {id: i.id}});
			await PostsToCategories.create({
				postId: post.id,
				categoryId: category.id
			});
		});

		return post;
	}
}

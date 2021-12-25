import Base from "../base.mjs";
import jwt from "jsonwebtoken";
import Posts from "../../models/posts.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import PostsImages from "../../models/posts-images.mjs";

export default class Create extends Base {
	async execute(params){
		const decode = await this.decodeToken(params.token);
		const post = await Posts.create({
			title: params.body.title,
			status: "live",
			content: params.body.content,
			userId: decode.id
		});
		params.body.images.map(async i => {
			const image = await PostsImages.findOne({where: {id: i.id}});
			await post.addPostsImages(image);
		});
		params.body.categories.map(async i => {
			const category = await PostsCategories.findOne({where: {id: i.id}});
			await post.addCategories(category);
		});
		return post;
	}
}

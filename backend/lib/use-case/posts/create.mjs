import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import jwt from "jsonwebtoken";
import Posts from "../../models/posts.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class Create extends Base {
	async execute(params){
		const decode = await jwt.verify(this.token, this.config.token.accessToken);
		const post = await Posts.create({
			title: params.body.title,
			publish_date: new Date(),
			status: "live",
			content: params.body.content,
			userId: decode.id
		});
		params.body.categories.map(async i => {
			const category = await PostsCategories.findOne({where: {id: i.id}});
			await post.addCategories(category);
		});
		return post;
	}
}

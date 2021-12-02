import Base from "../base.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class Create extends Base {
	async execute(params){
		const category = await PostsCategories.create({
			title: params.body.title,
			description: params.body.description
		});
		return category;
	}
}

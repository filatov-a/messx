import Base from "../base.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class Create extends Base {
	async execute({data}){
		const category = await PostsCategories.create({
			title: data.title,
			description: data.description
		});
		return category;
	}
}

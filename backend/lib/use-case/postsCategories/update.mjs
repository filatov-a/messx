import Base from "../base.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class Update extends Base {
	async execute({data}){
		const category = await PostsCategories.findByPk(data.id);
		const newCategory = await category.update({
			title: data.title,
			description: data.description
		});
		return {newCategory};
	}
}

import Base from "../base.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class Update extends Base {
	async execute(params){
		const category = await PostsCategories.findByPk(params.params.id);
		const newCategory = await category.update({
			title: category.body.title,
			description: category.body.description
		});
		return {newCategory};
	}
}

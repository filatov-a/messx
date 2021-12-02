import Base from "../base.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class GetAll extends Base {
	async execute(params){
		const all = await PostsCategories.findAll();
		return {all};
	}
}

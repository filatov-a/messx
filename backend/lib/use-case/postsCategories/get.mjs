import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class Get extends Base {
	async execute({data}){
		const {id} = data;
		const category = await PostsCategories.findOne({
			where: {id: id},
			include: [
				Posts
			]
		});
		return {category};
	}
}

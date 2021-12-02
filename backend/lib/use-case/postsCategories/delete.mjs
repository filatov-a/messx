import Base from "../base.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class Delete extends Base {
	async execute(params){
		const category = await PostsCategories.destroy({
			where: {
				id: params.params.id
			},
		});
		return {category};
	}
}

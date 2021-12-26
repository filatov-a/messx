import Base from "../base.mjs";
import PostsCategories from "../../models/posts-categories.mjs";

export default class Delete extends Base {
	async execute({data}){
		const category = await PostsCategories.destroy({
			where: {
				id: data.id
			},
		});
		return {category};
	}
}

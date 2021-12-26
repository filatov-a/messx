import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";

export default class Delete extends Base {
	async execute({data}){
		const post = await Posts.destroy({
			where: {
				id: data.params.id
			},
		});
		return {post};
	}
}

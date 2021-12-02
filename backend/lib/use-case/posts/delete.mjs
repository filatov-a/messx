import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";

export default class Delete extends Base {
	async execute(params){
		const post = await Posts.destroy({
			where: {
				id: params.params.id
			},
		});
		return {post};
	}
}

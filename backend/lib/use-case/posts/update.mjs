import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";

export default class Update extends Base {
	async execute(params){
		const post = await Posts.findByPk(params.params.id);
		const newPost = await post.update({
			title: params.body.title,
			content: params.body.content,
		});
		return {newPost};
	}
}

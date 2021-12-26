import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";

export default class Update extends Base {
	async execute({data}){
		const post = await Posts.findByPk(data.params.id);
		const newPost = await post.update({
			title: data.body.title,
			content: data.body.content,
		});
		return {newPost};
	}
}

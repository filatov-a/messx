import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";

export default class Delete extends Base {
	async execute({data}){
		const post = await Posts.findOne({
			where: {
				id: data.id
			},
		});
		await Posts.destroy({
			where: {
				id: data.id
			},
		});
		return post;
	}
}

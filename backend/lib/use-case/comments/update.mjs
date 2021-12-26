import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";

export default class Update extends Base {
	async execute({data}){
		const body = data.body;
		const comment = await Comments.findByPk(data.params.id);
		const newComment = await comment.update({
			content: body.content
		});
		return {newComment};
	}
}

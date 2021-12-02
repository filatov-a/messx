import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";

export default class Update extends Base {
	async execute(params){
		const body = params.body;
		const comment = await Comments.findByPk(params.params.id);
		const newComment = await comment.update({
			content: body.content
		});
		return {newComment};
	}
}

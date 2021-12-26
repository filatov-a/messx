import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";

export default class Update extends Base {
	async execute({data}){
		const comment = await Comments.findByPk(data.id);
		const newComment = await comment.update({
			content: data.content
		});
		return {newComment};
	}
}

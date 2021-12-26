import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";
import LikesToComments from "../../models/likes-comments.mjs";

export default class Get extends Base {
	async execute({data}){
		const comments = Comments;
		const {id} = data;
		const comment = await comments.findByPk(id, {
			include: LikesToComments,
		});
		let likes = [], dislikes = [];
		for (let i = 0; i < comment.LikesToComments.length; i++){
			if (comment.LikesToComments[i].type === "like") likes.push(comment.LikesToComments[i]);
			else dislikes.push(comment.LikesToComments[i]);
		}

		return {likes: likes, dislikes: dislikes};
	}
}

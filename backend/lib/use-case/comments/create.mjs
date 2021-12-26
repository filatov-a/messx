import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";

export default class Create extends Base {
	async execute({data, context}){
		const comment = await Comments.create({
			content: data.body,
			userId: context.userId,
			postId: data.params.id,
		});

		return {comment};
	}
}

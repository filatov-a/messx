import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";

export default class Create extends Base {
	async execute(params){
		const decode = await this.decodeToken(params.token);
		const comment = await Comments.create({
			content: params.body,
			userId: decode.id,
			postId: params.params.id,
		});

		return {comment};
	}
}

import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";
import jwt from "jsonwebtoken";

export default class Create extends Base {
	async execute(params){
		const decode = await jwt.verify(params.token, this.config.token.verifyEmailToken);
		const comment = await Comments.create({
			content: params.body,
			userId: decode.id,
			postId: params.params.id,
		});

		return {comment};
	}
}

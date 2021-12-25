import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";
import LikesToComments from "../../models/likes-comments.mjs";
import jwt from "jsonwebtoken";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";

export default class Like extends Base {
	async execute(params){
		const decode = await this.decodeToken(params.token);
		const comment = await Comments.findByPk(params.params.id);
		const body = params.body;

		const post = await Posts.findByPk(comment.postId);
		const one = await Users.findOne({ where: { id: post.userId } });

		const prevLike = await LikesToComments.findOne({where: {
			userId: decode.id, commentId: comment.id
		}});
		if (prevLike !== null) {
			await this.#deleteLike(params);
			if (prevLike.type !== body.type){
				await this.execute(params);
				if (body.type === "like") await one.update({rating: one.rating+2});
				else await one.update({rating: one.rating-2});
			} else {
				if (body.type === "like") await one.update({rating: one.rating-1});
				else await one.update({rating: one.rating+1});
			}
			return;
		} else {
			if (body.type === "like") await one.update({rating: one.rating+1});
			else await one.update({rating: one.rating-1});
		}

		const like = await LikesToComments.create({
			type: body.type,
			userId: decode.id,
			commentId: comment.id
		});
		return {like}
	}

	async #deleteLike(params){
		const decode = await jwt.verify(params.token, params.config.token.accessToken);
		await LikesToComments.destroy({
			where: {
				commentId: params.params.id,
				userId: decode.id
			},
		});
	}
}

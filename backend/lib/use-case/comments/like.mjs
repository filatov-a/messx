import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";
import LikesToComments from "../../models/likes-comments.mjs";
import jwt from "jsonwebtoken";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";

export default class Like extends Base {
	async execute({data, context}){
		const comment = await Comments.findByPk(data.params.id);
		const body = data.body;

		const post = await Posts.findByPk(comment.postId);
		const one = await Users.findOne({ where: { id: post.userId } });

		const prevLike = await LikesToComments.findOne({where: {
			userId: context.userId, commentId: comment.id
		}});
		if (prevLike !== null) {
			await this.#deleteLike({data, context});
			if (prevLike.type !== body.type){
				await this.execute({data, context});
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
			userId: context.userId,
			commentId: comment.id
		});
		return {like}
	}

	async #deleteLike({data, context}){
		await LikesToComments.destroy({
			where: {
				commentId: data.params.id,
				userId: context.userId
			},
		});
	}
}

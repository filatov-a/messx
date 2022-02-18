import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";
import LikesComments from "../../models/likes-comments.mjs";
import Users from "../../models/users.mjs";

export default class Like extends Base {
	async execute({data, context}){
		const comment = await Comments.findByPk(data.id);
		const prevLike = await LikesComments.findOne({where: {
				userId: context.userId, commentId: comment.id
			}});

		const one = await Users.findOne({ where: { id: comment.userId } });

		if (prevLike !== null) {
			const dLike = await this.#deleteLike({data, context});
			let l = null;
			if (prevLike.type !== data.type){
				l = await this.execute({data, context});
				if (data.type === "like") await one.update({rating: one.rating+2});
				else await one.update({rating: one.rating-2});
			} else {
				if (data.type === "like") await one.update({rating: one.rating-1});
				else await one.update({rating: one.rating+1});
			}
			return {dLike, like: l?.like};
		} else {
			if (data.type === "like") await one.update({rating: one.rating+1});
			else await one.update({rating: one.rating-1});
		}
		const like = await LikesComments.create({
			publish_date: new Date(),
			type: data.type,
			userId: context.userId,
			commentId: comment.id
		});
		return {like}
	}

	async #deleteLike({data, context}){
		const like = await LikesComments.findOne({
			where: {
				commentId: data.id,
				userId: context.userId
			},
		});
		await LikesComments.destroy({
			where: {
				commentId: data.id,
				userId: context.userId
			},
		});
		return like
	}
}

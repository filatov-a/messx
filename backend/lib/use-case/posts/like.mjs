import Base from "../base.mjs";
import LikesToComments from "../../models/likes-comments.mjs";
import jwt from "jsonwebtoken";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";
import LikesPosts from "../../models/likes-posts.mjs";

export default class Like extends Base {
	async execute({data, context}){
		const post = await Posts.findByPk(data.params.id);
		const prevLike = await LikesPosts.findOne({where: {
			userId: context.id, postId: post.id
		}});

		const one = await Users.findOne({ where: { id: post.userId } });

		if (prevLike !== null) {
			const dLike = await this.#deleteLike({data, context});
			let l = null;
			if (prevLike.type !== data.body.type){
				l = await this.execute({data, context});
				if (data.body.type === "like") await one.update({rating: one.rating+2});
				else await one.update({rating: one.rating-2});
			} else {
				if (data.body.type === "like") await one.update({rating: one.rating-1});
				else await one.update({rating: one.rating+1});
			}
			return {dLike, like: l?.like};
		} else {
			if (data.body.type === "like") await one.update({rating: one.rating+1});
			else await one.update({rating: one.rating-1});
		}
		const like = await LikesPosts.create({
			publish_date: new Date(),
			type: data.body.type,
			userId: context.userId,
			postId: post.id
		});
		return {like}
	}

	async #deleteLike({data, context}){
		const like = await LikesPosts.findOne({
			where: {
				postId: data.params.id,
				userId: data.decode.id
			},
		});
		await LikesPosts.destroy({
			where: {
				postId: data.params.id,
				userId: context.userId
			},
		});
		return like
	}
}

import Base from "../base.mjs";
import LikesToComments from "../../models/likes-comments.mjs";
import jwt from "jsonwebtoken";
import Posts from "../../models/posts.mjs";
import Users from "../../models/users.mjs";
import LikesPosts from "../../models/likes-posts.mjs";

export default class Like extends Base {
	async execute(params){
		const decode = await jwt.verify(params.token, this.config.token.accessToken);
		const post = await Posts.findByPk(params.params.id);
		const prevLike = await LikesPosts.findOne({where: {
			userId: decode.id, postId: post.id
		}});

		const one = await Users.findOne({ where: { id: post.userId } });

		if (prevLike !== null) {
			const dLike = await this.#deleteLike({...params, decode});
			let l = null;
			if (prevLike.type !== params.body.type){
				l = await this.execute(params);
				if (params.body.type === "like") await one.update({rating: one.rating+2});
				else await one.update({rating: one.rating-2});
			} else {
				if (params.body.type === "like") await one.update({rating: one.rating-1});
				else await one.update({rating: one.rating+1});
			}
			return {dLike, like: l?.like};
		} else {
			if (params.body.type === "like") await one.update({rating: one.rating+1});
			else await one.update({rating: one.rating-1});
		}
		const like = await LikesPosts.create({
			publish_date: new Date(),
			type: params.body.type,
			userId: decode.id,
			postId: post.id
		});
		return {like}
	}

	async #deleteLike(params){
		const like = await LikesPosts.findOne({
			where: {
				postId: params.params.id,
				userId: params.decode.id
			},
		});
		await LikesPosts.destroy({
			where: {
				postId: params.params.id,
				userId: params.decode.id
			},
		});
		return like
	}
}

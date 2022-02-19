import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";
import LikesComments from "../../models/likes-comments.mjs";
import Users from "../../models/users.mjs";

export default class Create extends Base {
	async execute({data, context}){
		const create = await Comments.create({
			content: data.content,
			userId: context.userId,
			postId: data.id,
		});

		const comment = await Comments.findOne({
			where: {id: create.id},
			include: [LikesComments, Users],
			attributes: {
				include: [
					[
						this.sequelize.literal(`(
									SELECT COUNT(*)
									FROM LikesComments
									WHERE
									LikesComments.commentId = Comments.id
									AND
									LikesComments.type = "like"
								)`), "likesCount"
					],
					[
						this.sequelize.literal(`(
									SELECT COUNT(*)
									FROM LikesComments
									WHERE
										LikesComments.commentId = Comments.id
										AND
										LikesComments.type = "dislike"
								)`), "dislikesCount"
					],
					[
						this.sequelize.literal(`(
									SELECT COUNT(*)
									FROM LikesComments
									WHERE
										LikesComments.userId = "${context.userId}"
										AND
										LikesComments.commentId = Comments.id
										AND
										LikesComments.type = "like"
								)`), "isLiked"
					],
					[
						this.sequelize.literal(`(
									SELECT COUNT(*)
									FROM LikesComments
									WHERE
										LikesComments.userId = "${context.userId}"
										AND
										LikesComments.commentId = Comments.id
										AND
										LikesComments.type = "dislike"
								)`), "isDisliked"
					],
				]
			},
		});

		return comment;
	}
}

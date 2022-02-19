import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";
import LikesToComments from "../../models/likes-comments.mjs";
import LikesComments from "../../models/likes-comments.mjs";
import Users from "../../models/users.mjs";

export default class Get extends Base {
	async execute({data}){
		const {id} = data;
		const comment = await Comments.findOne({
			where: {id: id},
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

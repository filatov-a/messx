import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Comments from "../../models/comments.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import LikesComments from "../../models/likes-comments.mjs";

export default class Get extends Base {
	async execute({data, context}){
		const {id} = data.params;

		const post = await Posts.findOne({
			where: {id: id},
			include: [
				{model: PostsCategories},
				{model: LikesPosts},
				{
					model: Comments,
					include: [LikesComments],
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
				},
			],
			attributes: {
				include: [
					[
						this.sequelize.literal(`(
							SELECT COUNT(*)
							FROM LikesPosts
							WHERE
							LikesPosts.postId = Posts.id
							AND
							LikesPosts.type = "like"
						)`), "likesCount"
					],
					[
						this.sequelize.literal(`(
							SELECT COUNT(*)
							FROM LikesPosts
							WHERE
								LikesPosts.postId = Posts.id
								AND
								LikesPosts.type = "dislike"
						)`), "dislikesCount"
					],
					[
						this.sequelize.literal(`(
							SELECT COUNT(*)
							FROM LikesPosts
							WHERE
								LikesPosts.userId = "${context.userId}"
								AND
								LikesPosts.postId = Posts.id
								AND
								LikesPosts.type = "like"
						)`), "isLiked"
					],
					[
						this.sequelize.literal(`(
							SELECT COUNT(*)
							FROM LikesPosts
							WHERE
								LikesPosts.userId = "${context.userId}"
								AND
								LikesPosts.postId = Posts.id
								AND
								LikesPosts.type = "dislike"
						)`), "isDisliked"
					],
				]
			},
		});
		return post;
	}
}

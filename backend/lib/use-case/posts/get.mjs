import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Comments from "../../models/comments.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import jwt from "jsonwebtoken";
import LikesComments from "../../models/likes-comments.mjs";

export default class Get extends Base {
	async execute(params){
		const posts = Posts;
		const {id} = params.params;
		const decode = await this.decodeToken(params.token);

		return posts.findOne({
			where: {id: id},
			include: [
				PostsCategories,
				LikesPosts,
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
										LikesComments.userId = "${decode?.id}"
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
										LikesComments.userId = "${decode?.id}"
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
								LikesPosts.userId = "${decode?.id}"
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
								LikesPosts.userId = "${decode?.id}"
								AND
								LikesPosts.postId = Posts.id
								AND
								LikesPosts.type = "dislike"
						)`), "isDisliked"
					],
				]
			},
		});
	}
}

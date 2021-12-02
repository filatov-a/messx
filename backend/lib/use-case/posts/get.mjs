import Base from "../base.mjs";
import Posts from "../../models/posts.mjs";
import Comments from "../../models/comments.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import LikesPosts from "../../models/likes-posts.mjs";

export default class Get extends Base {
	async execute(params){
		const posts = Posts;
		const {id} = params.params;
		const post = await posts.findOne({
			where: {id: id},
			include: [
				Comments,
				PostsCategories,
				LikesPosts
			]
		});
		return post;
	}
}

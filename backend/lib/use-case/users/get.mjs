import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Posts from "../../models/posts.mjs";
import Chats from "../../models/chats.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import LikesComments from "../../models/likes-comments.mjs";
import Messages from "../../models/messages.mjs";
import PostsCategories from "../../models/posts-categories.mjs";
import jwt from "jsonwebtoken";

export default class Get extends Base {
	async execute(params){
		const {id} = params.params;
		return Users.findOne({
			where: {id: id},
			include: [
				{association: "followers"},
				{association: "follow"},
				{model: Chats},
				{model: Messages},
			]
		});
	}
}

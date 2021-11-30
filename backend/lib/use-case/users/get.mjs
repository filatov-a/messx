import Base from "../base.mjs";
import Users from "../../models/users.mjs";
import Posts from "../../models/posts.mjs";
import Chats from "../../models/chats.mjs";
import LikesPosts from "../../models/likes-posts.mjs";
import LikesComments from "../../models/likes-comments.mjs";

export default class Get extends Base {
	static async execute(params){
		const {id} = params.params;
		const user = await Users.findOne({
			where: {id: id},
			include: [
				{association: "followers"},
				{association: "users"},
				Posts,
				Chats,
				LikesPosts,
				LikesComments
			]
		});
		return {user};
	}
}

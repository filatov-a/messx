import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";

export default class Delete extends Base {
	async execute(params){
		const comment = await Comments.destroy({
			where: {
				id: params.params.id
			},
		});

		return {comment};
	}
}

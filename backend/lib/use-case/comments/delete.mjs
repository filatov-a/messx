import Base from "../base.mjs";
import Comments from "../../models/comments.mjs";

export default class Delete extends Base {
	async execute({data}){
		const comment = await Comments.destroy({
			where: {
				id: data.id
			},
		});

		return {comment};
	}
}

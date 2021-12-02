import create from "../../../use-case/postsCategories/create.mjs";
import get from "../../../use-case/postsCategories/get.mjs";
import getAll from "../../../use-case/postsCategories/getAll.mjs";
import Delete from "../../../use-case/postsCategories/delete.mjs";
import update from "../../../use-case/postsCategories/update.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	create: Runner.makeRunner(create),
	get: Runner.makeRunner(get),
	getAll: Runner.makeRunner(getAll),
	update: Runner.makeRunner(update),
	delete: Runner.makeRunner(Delete)
};

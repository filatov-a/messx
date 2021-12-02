import create from "../../../use-case/chatsCategories/create.mjs";
import get from "../../../use-case/chatsCategories/get.mjs";
import getAll from "../../../use-case/chatsCategories/getAll.mjs";
import Delete from "../../../use-case/chatsCategories/delete.mjs";
import update from "../../../use-case/chatsCategories/update.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	create: Runner.makeRunner(create),
	get: Runner.makeRunner(get),
	getAll: Runner.makeRunner(getAll),
	update: Runner.makeRunner(update),
	delete: Runner.makeRunner(Delete)
};

import create from "../../../use-case/posts/create.mjs";
import get from "../../../use-case/posts/get.mjs";
import getAll from "../../../use-case/posts/getAll.mjs";
import Delete from "../../../use-case/posts/delete.mjs";
import update from "../../../use-case/posts/update.mjs";
import like from "../../../use-case/posts/like.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	create: Runner.makeRunner(create),
	get: Runner.makeRunner(get),
	getAll: Runner.makeRunner(getAll),
	update: Runner.makeRunner(update),
	delete: Runner.makeRunner(Delete),
	like: Runner.makeRunner(like)
};

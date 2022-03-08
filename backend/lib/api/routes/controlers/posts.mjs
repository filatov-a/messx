import Runner from "../../utils/use-case-runner.mjs";

import create from "../../../use-case/posts/create.mjs";
import get from "../../../use-case/posts/get.mjs";
import getAll from "../../../use-case/posts/getAll.mjs";
import getAllDay from "../../../use-case/posts/getAllDay.mjs";
import Delete from "../../../use-case/posts/delete.mjs";
import update from "../../../use-case/posts/update.mjs";
import like from "../../../use-case/posts/like.mjs";

export default {
	create: Runner.makeRunnerToken(create),
	get: Runner.makeRunnerToken(get),
	getAll: Runner.makeRunnerToken(getAll),
	getAllDay: Runner.makeRunnerToken(getAllDay),
	update: Runner.makeRunner(update),
	delete: Runner.makeRunner(Delete),
	like: Runner.makeRunnerToken(like),
};

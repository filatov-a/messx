import create from "../../../use-case/comments/create.mjs";
import get from "../../../use-case/comments/get.mjs";
import Delete from "../../../use-case/comments/delete.mjs";
import update from "../../../use-case/comments/update.mjs";
import like from "../../../use-case/comments/like.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	create: Runner.makeRunnerToken(create),
	get: Runner.makeRunner(get),
	update: Runner.makeRunner(update),
	delete: Runner.makeRunner(Delete),
	like: Runner.makeRunnerToken(like)
};

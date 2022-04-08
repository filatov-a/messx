import create from "../../../use-case/chats/create.mjs";
import get from "../../../use-case/chats/get.mjs";
import getAll from "../../../use-case/chats/getAll.mjs";
import Delete from "../../../use-case/chats/delete.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	create: Runner.makeRunnerToken(create),
	get: Runner.makeRunner(get),
	getAll: Runner.makeRunner(getAll),
	delete: Runner.makeRunner(Delete)
};

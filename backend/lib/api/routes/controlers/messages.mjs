import create from "../../../use-case/messages/create.mjs";
import get from "../../../use-case/messages/get.mjs";
import Delete from "../../../use-case/messages/delete.mjs";
import update from "../../../use-case/messages/update.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	create: Runner.makeRunner(create),
	get: Runner.makeRunner(get),
	update: Runner.makeRunner(update),
	delete: Runner.makeRunner(Delete)
};

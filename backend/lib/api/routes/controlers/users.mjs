import create from "../../../use-case/users/create.mjs";
import get from "../../../use-case/users/get.mjs";
import getAll from "../../../use-case/users/getAll.mjs";
import Delete from "../../../use-case/users/delete.mjs";
import update from "../../../use-case/users/update.mjs";
import setAvatar from "../../../use-case/users/setAvatar.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	create: Runner.makeRunner(create),
	get: Runner.makeRunner(get),
	getAll: Runner.makeRunner(getAll),
	update: Runner.makeRunner(update),
	setAvatar: Runner.makeRunnerAvatar(setAvatar),
	delete: Runner.makeRunner(Delete)
};

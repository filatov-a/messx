import create from "../../../use-case/users/create.mjs";
import get from "../../../use-case/users/get.mjs";
import getPosts from "../../../use-case/users/getPosts.mjs";
import getAll from "../../../use-case/users/getAll.mjs";
import Delete from "../../../use-case/users/delete.mjs";
import update from "../../../use-case/users/update.mjs";
import SetAvatar from "../../../use-case/users/setAvatar.mjs";
import Follow from "../../../use-case/users/follow.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	create: Runner.makeRunner(create),
	get: Runner.makeRunnerToken(get),
	getPosts: Runner.makeRunnerToken(getPosts),
	getAll: Runner.makeRunner(getAll),
	update: Runner.makeRunner(update),
	setAvatar: Runner.makeRunnerAvatar(SetAvatar),
	delete: Runner.makeRunner(Delete),
	follow: Runner.makeRunnerToken(Follow)
};

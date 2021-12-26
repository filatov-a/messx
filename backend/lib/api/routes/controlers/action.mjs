import register from "../../../use-case/actions/register.mjs";
import emailVerify from "../../../use-case/actions/email-verify.mjs";
import login from "../../../use-case/actions/login.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	register: Runner.makeRunner(register),
	registerVerify: Runner.makeRunnerToken(emailVerify),
	login: Runner.makeRunner(login)
};

import register from "../../../use-case/actions/register.mjs";
import registerVerify from "../../../use-case/actions/register-verify.mjs";
import login from "../../../use-case/actions/login.mjs";

import Runner from "../../utils/use-case-runner.mjs";

export default {
	register: Runner.makeRunner(register),
	registerVerify: Runner.makeRunnerToken(registerVerify),
	login: Runner.makeRunner(login)
};

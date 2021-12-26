import multer from "../../middleware/multer.mjs";
import {validateJwt} from "../../use-case/sessions/validate.mjs";

export default class Runner {
	static makeRunner(Case) {
		return async function(req, res){
			try {
				const _case = new Case(req.sequelize);
				await _case.validate({...req.body});
				const result = await _case.execute({
					data: {...req.body, ...req.params, ...req.query},
					context : {
						userId: req.userData?.id
					}
				});
				res.send(result);
			} catch (err) {
				res.status(400).send({error: err.message});
			}
		};
	}

	static makeRunnerAvatar(Case) {
		return [validateJwt, multer.single("avatar"), this.makeRunner(Case)];
	}

	static makeRunnerToken(Case) {
		return [validateJwt, this.makeRunner(Case)];
	}
}

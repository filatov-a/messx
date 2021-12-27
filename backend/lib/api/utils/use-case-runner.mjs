import multer from "../../middleware/multer.mjs";
import {validateJwt} from "../../use-case/sessions/validate.mjs";

export default class Runner {
	static makeRunner(Case) {
		return async function(req, res){
			try {
				const data = {...req.body, ...req.params, ...req.query};

				const _case = new Case(req.sequelize);
				if (_case?.livrValidate){
					await _case.livrValidate(data);
				}
				const result = await _case.execute({
					data,
					context : {
						...req.userData
					}
				});
				res.send(result);
			} catch (err) {
				res.status(400).send({
					error: {...err}
				});
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

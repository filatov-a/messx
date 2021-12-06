import getToken from "../../utils/getToken.mjs";
import multer from "../../middleware/multer.mjs";

export default class Runner {
	static makeRunner(Case) {
		return async function(req, res){
			try {
				const token = getToken(req);
				const params = {...req, token};

				const _case = new Case();
				await _case.validate(params.body);
				const result = await _case.execute(params);

				res.send(result);
			} catch (err) {
				res.status(400).send({error: err.message});
			}
		};
	}

	static makeRunnerAvatar(Case) {
		return [multer.single("avatar"), this.makeRunner(Case)];
	}
}
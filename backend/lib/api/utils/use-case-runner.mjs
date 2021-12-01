import getToken from "../../utils/getToken.mjs";
import multer from "../../middleware/multer.mjs";

export default class Runner {
	static makeRunner(Case) {
		return async function(req, res){
			try {
				const token = getToken(req);
				const result = await Case.execute({...req, token});
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

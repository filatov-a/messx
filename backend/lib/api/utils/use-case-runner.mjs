import getToken from "../../utils/getToken.mjs";
import multer from "../../middleware/multer.mjs";

export default class Runner {
	static makeRunner(Case) {
		return async function(req, res){
			try {
				const params = this.setParams(req);
				const result = await Case.execute(params);
				res.send(result);
			} catch (err) {
				res.status(400).send({error: err.message});
			}
		};
	}

	static makeRunnerImage(Case) {
		return [multer, this.makeRunner(Case)];
	}

	static setParams(req){
		const token = getToken(req);
		const params = req.params;
		const query = req.query;
		const body = req.body;
		const avatar = req.file ? req.file.filename : null;
		return{
			token,
			params,
			query,
			body,
			avatar
		};
	}
}

import jwt from "jsonwebtoken";
import Users from "../../models/users.mjs"; 
import config from "#messx-global-config";
import getToken from "../../utils/getToken.mjs";

async function validateJwt(req, res, next) {
	try {
		const token = getToken(req);
		const userData = await jwt.verify(token, config.token.accessToken);

		const isValid = await Users.findByPk(userData.id);

		if (!isValid) {
			throw new Error("NOT_VALID_USER");
		}

		req.userData = {
			userId: userData.id,
			userInstance: isValid
		};

		await next()
	} catch (e) {
		res.status(400).send({
			error: "WRONG_TOKEN"
		});
	}
}

export {validateJwt};
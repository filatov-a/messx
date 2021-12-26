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

		req.userData = userData;
		req.userInstance = isValid;
		await next();
	} catch (e) {
		throw new Error("WRONG_TOKEN");
	}
}

export {validateJwt};
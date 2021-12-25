import jwt from "jsonwebtoken";
import Users from "../../models/users.mjs";
import config from '../../config/config.cjs';

async function validateJwt({token}) {
    try {

        const userData = await jwt.verify(token, config.token.accessToken);

        const isValid = await Users.findByPk(userData.id);

        if (!isValid) {
            throw new Error('NOT_VALID_USER');
        }

        return { ...userData, userInstance: isValid };
    } catch (e) {
        throw new Error('WRONG_TOKEN');
    }
}

export {validateJwt};
import config  from "../config/config.cjs";
import joi from "../utils/joi.mjs"
import jwt from "jsonwebtoken";

export default class Base {
    config;
    validateSchema;
    sequelize;
    constructor(_sequelize) {
        this.config = config;
        this.validateSchema = null;
        this.sequelize = _sequelize;
    }

    async validate(body){
        if (this.validateSchema){
            await joi(this.validateSchema, body);
        }
    }

    async decodeToken(token){
        return jwt.verify(token, this.config.token.accessToken);
    }
}

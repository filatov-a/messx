import config  from "../config/config.cjs";
import joi from "../utils/joi.mjs"
import livr from "livr";
import "../utils/livr.mjs"

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

    async doValidation(data, rules) {
        const validator = new livr.Validator(rules).prepare();
        const result = validator.validate(data);

        if (!result) {
            throw validator.getErrors();
        }

        return result;
    }
}

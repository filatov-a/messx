import config  from "../config/config.cjs";
import joi from "../utils/joi.mjs"

export default class Base {
    config
    validateSchema

    constructor() {
        this.config = config;
        this.validateSchema = null;
    }

    async validate(body){
        if (this.validateSchema){
            await joi(this.validateSchema, body);
        }
    }
}

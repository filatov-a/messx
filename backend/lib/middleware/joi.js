const Joi = require("joi");

const joi = async (schema, body) => {
	const {error} = await schema.validate(body);
	const valid = error == null;

	if (valid) {
		return true;
	} else {
		const {details} = error;
		const message = details.map((i) => i.message).join(",");
		console.log("error", message);
		throw new Error(message);
	}
};

module.exports = joi;

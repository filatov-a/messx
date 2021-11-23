const Joi = require("joi");

const joi = (schema, property) => async (req, res, next) => {
	const {error} = await schema.validate(req.body);
	const valid = error == null;

	if (valid) {
		await next();
	} else {
		const {details} = error;

		const message = details.map((i) => i.message).join(",");

		console.log("error", message);
		res.status(422).send({error: message});
	}
};

module.exports = joi;

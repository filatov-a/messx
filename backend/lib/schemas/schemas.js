const Joi = require("joi");

module.exports.user_schema = Joi.object().keys({
	username: Joi.string().min(3).max(20).lowercase().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(3).max(15).required(),
	password_confirmation: Joi.any().valid(Joi.ref("password")).required(),
	full_name: Joi.string().min(3).max(20).required(),
	gender: Joi.string().regex(/male|female/),
});

module.exports.password_schema = Joi.object().keys({
	password: Joi.string().min(3).max(30).required(),
	password_confirmation: Joi.any().valid(Joi.ref("password")).required(),
});

module.exports.admin_schema = Joi.object().keys({
	username: Joi.string().min(3).max(20).lowercase(),
	email: Joi.string().email(),
	password: Joi.string().min(3).max(15),
	password_confirmation: Joi.any().valid(Joi.ref("password")),
	full_name: Joi.string().min(3).max(20),
	role: Joi.string().regex(/user|admin|superAdmin/),
	gender: Joi.string().regex(/male|female/),
});

module.exports.message_schema = Joi.object().keys({
	name: Joi.string().min(3).max(20).required(),
	descriptions: Joi.string().min(1).max(100).required(),
});

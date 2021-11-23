const jwt = require("jsonwebtoken");
const config = require("../config/project");
const db = require("../models/index");
const {getToken} = require("../utils/getToken");

module.exports.createMessage = async (req, res) => {
	try {
		const users = db.Users;
		const mess = db.Messages;
		const token = getToken(req);
		const decode = await jwt.verify(token, config.token.accessToken);
		const usrDb = await users.findOne({where: {id: decode.id}});
		if (!usrDb) throw new Error("user didn't auth! Incorrect token");
		const schema = {
			name: req.body.name,
			descriptions: req.body.descriptions,
			isActive: true,
			userId: usrDb.id,
		};
		const newMess = await mess.create(schema);

		res.send({event: newMess});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getMessageById = async (req, res) => {
	try {
		const {id} = req.params;
		const mess = db.Messages;

		const one = await mess.findOne({where: {id: id}});
		if (!one) throw new Error("event didn't found! Incorrect id");
		res.send(one);
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getUserMessage = async (req, res) => {
	try {
		const users = db.Users;
		const mess = db.Messages;
		const token = getToken(req);
		const decode = await jwt.verify(token, config.token.accessToken);

		const user = await users.findOne({
			where: {id : decode.id},
			include: mess,
		});
		if (!user) throw new Error("user didn't found! Incorrect auth token!");

		res.send(user.Messages);
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.deleteMessageById = async (req, res) => {
	try {
		const mess = db.Messages;
		const {id} = req.params;
		const one = await mess.destroy({
			where: {
				id: id
			},
		});
		if (!one) throw new Error("event didn't found! Incorrect id!");
		res.send(one);
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

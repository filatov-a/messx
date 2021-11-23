const jwt = require("jsonwebtoken");
const config = require("../config/project");
const db = require("../models/index");
const {getToken} = require("../utils/getToken");

module.exports.createMessage = async (req, res) => {
	try {
		const mess = db.Messages;
		const { id } = req.params;
		const schema = {
			name: req.body.name,
			descriptions: req.body.descriptions,
			isActive: true,
			chatId: id,
		};
		const newMess = await mess.create(schema);

		res.send(newMess);
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getMessageById = async (req, res) => {
	try {
		const {id} = req.body;
		const mess = db.Messages;

		const one = await mess.findOne({where: {id: id}});
		if (!one) throw new Error("event didn't found! Incorrect id");
		res.send(one);
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.deleteMessageById = async (req, res) => {
	try {
		const mess = db.Messages;
		const {id} = req.body;
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

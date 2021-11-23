const jwt = require("jsonwebtoken");
const config = require("../config/project");
const db = require("../models/index");
const {getToken} = require("../utils/getToken");

module.exports.createChat = async (req, res) => {
	try {
		const users = db.Users;
		const chats = db.Chats;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		const usrDb = await users.findOne({where: {id: decode.id}});
		if (!usrDb) throw new Error("user didn't auth! Incorrect token");
		const schema = {
			name: req.body.name,
			descriptions: req.body.descriptions,
			isActive: true,
			userId: usrDb.id,
		};
		const newChats = await chats.create(schema);

		res.send(newChats);
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getChatById = async (req, res) => {
	try {
		const {id} = req.params;
		const chats = db.Chats;

		const one = await chats.findOne({where: {id: id}});
		if (!one) throw new Error("event didn't found! Incorrect id");
		res.send(one);
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getChatMessages = async (req, res) => {
	try {
		const chats = db.Chats;
		const mess = db.Messages;
		const { id } = req.params;

		const chat = await chats.findOne({
			where: {id: id},
			include: mess,
		});
		if (!chat) throw new Error("chat didn't found! Incorrect auth token!");

		res.send(chat.Messages);
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.deleteChatById = async (req, res) => {
	try {
		const chats = db.Chats;
		const {id} = req.params;
		const one = await chats.destroy({
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

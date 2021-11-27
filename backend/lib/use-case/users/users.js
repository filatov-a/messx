const config = require("../config/config");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../models/index");

module.exports.getAllUsers = async (req, res) => {
	try {
		const {limit, offset} = req.query;
		const all = await db.Users.findAndCountAll({
			limit: limit,
			offset: offset,
			where: where
		});
		res.send({users: all.rows, count: all.count});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getUserById = async (req, res) => {
	try {
		const {user_id} = req.params;
		const one = await db.Users.findOne({
			where: {id: user_id},
			include: [
				{association: 'followers'},
				{association: 'users'},
			]
		});
		res.send(one);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports.createUser = async (req, res) => {
	try {
		const user = req.body;
		user["isVerified"] = true;
		const one = await db.Users.createUser(user);
		res.send(one);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports.updateUser = async (req, res) => {
	try {
		const {user_id} = req.params;
		const update = await db.Users.updateUser({
			id: user_id,
			params: req.body
		});
		res.send(update);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports.deleteUser = async (req, res) => {
	try {
		const { user_id } = req.params;
		const one = await db.Users.destroy({ where: { id: user_id } });
		res.send(one);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports.setAvatar = async (req, res) => {
	try {
		const users = db.Users;
		const avatar = req.file.filename;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		const one = await users.updateUser(
			{id: decode.id, params:{profile_picture: avatar}}
		);
		res.send(one);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

function getToken(req, res){
	const authHeader = req.get("authorization");
	return authHeader && authHeader.split(" ")[1];
}

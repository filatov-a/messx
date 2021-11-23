const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../models/index");

module.exports.getAllUsers = async (req, res) => {
	try {
		const users = db.Users;
		const {limit, offset} = req.query;
		const all = await users.findAndCountAll({
			limit: limit,
			offset: offset,
			where: {}
		});
		res.status(200).send({users: all.rows, count: all.count});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.getUserById = async (req, res) => {
	try {
		const users = db.Users;
		const {user_id} = await req.params;
		const one = await users.findOne({ where: { id: user_id } });
		res.status(200).send(one);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports.createUser = async (req, res) => {
	try {
		const users = db.Users;
		const user = req.body;
		user["isVerified"] = true;
		const login = await users.findOne({ where: { login: user.login } });
		const email = await users.findOne({ where: { email: user.email } });
		if (login !== null) throw new Error("login is busy");
		if (email !== null) throw new Error("email is busy");
		const one = await users.create(user);
		res.status(200).send(one);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports.updateUser = async (req, res) => {
	try {
		const users = db.Users;
		const user = req.body;
		console.log({user});
		const {user_id} = await req.params;
		const one = await users.findOne({ where: { id: user_id } });
		let update = null;
		if (user.username){
			const username = await users.findOne({ where: { username: user.username } });
			if (username !== null) throw new Error("login is busy");
			update = await one.update({username: user.username});
		}
		if (user.full_name){
			update = await one.update({full_name: user.full_name});
		}
		if (user.password){
			user.password = await argon2.hash(user.password);
			update = await one.update({password: user.password});
		}
		if (user.phone){
			const phone = await users.findOne({ where: { phone: user.phone } });
			if (phone !== null) throw new Error("phone is busy");
			update = await one.update({phone: user.phone});
		}
		if (user.card){
			update = await one.update({card: user.card});
		}
		if (user.email){
			const email = await users.findOne({ where: { email: user.email } });
			if (email !== null) throw new Error("email is busy");
			update = await one.update({email: user.email});
		}
		if (user.role){
			update = await one.update({role: user.role});
		}
		res.status(200).send(update);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports.deleteUser = async (req, res) => {
	try {
		const users = db.Users;
		const {user_id} = await req.params;
		const one = await users.destroy({ where: { id: user_id } });
		res.status(200).send("delete user successfully!");
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};


const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const config = require("../config/project");
const mail = require("../utils/email");
const db = require("../models/index");

module.exports.register = async (req, res) => {
	try {
		const users = db.Users;
		const user = req.body;

		user.password = await argon2.hash(user.password);
		const usrDb = await users.create(user);
		const token = await jwt.sign({id: usrDb.id}, config.token.verifyEmailToken, {expiresIn: "1h"});
		const url = `http://localhost:3000/register/verify-email/${token}`;

		await mail.sendToVerify(user.email, url, "click to verify account", "");
		res.status(200).send({user: usrDb, token});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.registerVerify = async (req, res) => {
	try {
		const users = db.Users;

		const {token} = req.params;
		const decoded = await jwt.verify(token, config.token.verifyEmailToken);
		const usrDb = await users.findOne({where: {id: decoded.id}});

		await usrDb.update({isVerified: true});
		res.status(200).send({msg: "email successfully verified!"});
	} catch (err) {
		res.status(400).send({error: err.message});
	}
};

module.exports.login = async (req, res) => {
	try {
		const users = db.Users;
		const user = req.body;
		const usrDb = await users.findOne({where: {username: user.username}});

		if (usrDb === null) {
			throw new Error("wrong account login");
		}

		const ok = await argon2.verify(usrDb.password, user.password);

		if (!ok) {
			throw new Error("wrong account password");
		}

		if (!usrDb.isVerified) {
			throw new Error("u must to verify account");
		}

		const token = await jwt.sign({id: usrDb.id}, config.token.accessToken, {expiresIn: "7d"});

		res.status(200).send({token, user: usrDb});
	} catch (err) {
		res.status(401).send({error: err.message});
	}
};

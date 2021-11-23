const config = require("../config");
const db = require("../models/index");
const jwt = require("jsonwebtoken");

module.exports.getAllCategories = async (req, res) => {
	try {
		const categories = db.ChatsCategories;
		const all = await categories.findAll();
		res.send(all);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getCategoryById = async (req, res) => {
	try {
		const categories = db.ChatsCategories;
		const {id} = req.params;
		const category = await categories.findOne({where: {id: id}});
		res.send(category);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getAllChatsFormCategory = async (req, res) => {
	try {
		const categories = db.ChatsCategories;
		const users = db.Users;
		const {id} = req.params;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		const usrDB = await users.findByPk(decode.id, {
			include: categories,
		});
		const category = await categories.findByPk(id, {
			include: usrDB.ChatsCategories,
		});
		res.send(category.Chats);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.newCategory = async (req, res) => {
	try {
		const categories = db.ChatsCategories;
		const body = req.body;
		const category = await categories.create({
			title: body.title,
			description: body.description
		});
		res.send(category);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.updateCategory = async (req, res) => {
	try {
		const categories = db.ChatsCategories;
		const body = req.body;
		const category = await categories.findByPk(req.params.id);
		const newCategory = await category.update({
			title: body.title,
			description: body.description
		});
		res.send(newCategory);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.deleteCategory = async (req, res) => {
	try {
		const categories = db.ChatsCategories;
		const category = await categories.destroy({
			where: {
				id: res.params.id
			},
		});
		res.send({message: "deleted category"});
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

function getToken(req, res){
	const authHeader = req.get("authorization");
	return authHeader && authHeader.split(" ")[1];
}
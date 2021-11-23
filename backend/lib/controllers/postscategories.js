const db = require("../models/index");

module.exports.getAllCategories = async (req, res) => {
	try {
		const categories = db.PostsCategories;
		const all = await categories.findAll();
		res.send(all);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getCategoryById = async (req, res) => {
	try {
		const categories = db.PostsCategories;
		const {id} = req.params;
		const category = await categories.findOne({where: {id: id}});
		res.send(category);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getAllPostsFormCategory = async (req, res) => {
	try {
		const categories = db.PostsCategories;
		const posts = db.Posts;
		const {id} = req.params;
		const category = await categories.findByPk(id, {
			include: posts,
		});
		res.send(category.Posts);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.newCategory = async (req, res) => {
	try {
		const categories = db.PostsCategories;
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
		const categories = db.PostsCategories;
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
		const categories = db.PostsCategories;
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
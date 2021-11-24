const config = require("../config/project");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models/index");

module.exports.getAllPosts = async (req, res) => {
	try {
		const posts = db.Posts;
		const {limit, offset} = req.query;
		let {title} = req.query;
		if (title === "undefined") title = "";

		const all = await posts.findAndCountAll({
			limit: limit,
			offset: offset,
			where: {
				title: {
					[Op.like]: `%${title}%`
				}
			}
		});

		res.send({posts: all.rows, count: all.count});
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getPostById = async (req, res) => {
	try {
		const posts = db.Posts;
		const {id} = req.params;
		const post = await posts.findOne({where: {id: id}});
		res.send(post);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getAllCommentsFormPost = async (req, res) => {
	try {
		const posts = db.Posts;
		const comments = db.Comments;
		const {id} = req.params;
		const post = await posts.findByPk(id, {
			include: comments,
		});
		res.send(post.Comments);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.newComment = async (req, res) => {
	try {
		const comments = db.Comments;
		const {id} = req.params;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		const body = req.body;

		const comment = await comments.create({
			publish_date: new Date(),
			content: body.content,
			userId: decode.id,
			postId: id
		});
		res.send(comment);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getAllCategoriesFromPost = async (req, res) => {
	try {
		const posts = db.Posts;
		const {id} = req.params;
		const post = await posts.findOne({
			where: {id : id},
			include: db.Categories,
		});
		res.send(post.Categories);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getAllLikesFromPost = async (req, res) => {
	try {
		const posts = db.Posts;
		const {id} = req.params;
		const post = await posts.findOne({
			where: {id : id},
			include: db.LikesToPosts,
		});
		let likes = [], dislikes = [];
		for (let i = 0; i < post.LikesToPosts.length; i++){
			if (post.LikesToPosts[i].type === "like") likes.push(post.LikesToPosts[i]);
			else dislikes.push(post.LikesToPosts[i]);
		}
		req.send({likes: likes, dislikes: dislikes});
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.newPost = async (req, res) => {
	try {
		const posts = db.Posts;
		const body = req.body;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		const post = await posts.create({
			title: body.title,
			publish_date: new Date(),
			status: "live",
			content: body.content,
			userId: decode.id
		});
		body.categories.map(async i => {
			const category = await db.PostsCategories.findOne({where: {id: i.id}});
			await post.addCategories(category);
		});

		res.send(post);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.newLike = async (req, res) => {
	try {
		const posts = db.Posts;
		const users = db.Users;
		const likes = db.LikesToPosts;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		const post = await posts.findByPk(req.params.id);
		const prevLike = await likes.findOne({where: {
			userId: decode.id, postId: post.id
		}});
		const one = await users.findOne({ where: { id: post.userId } });
		const body = req.body;

		if (prevLike !== null) {
			await module.exports.deleteLikeFromPost(req, res);
			if (prevLike.type !== body.type){
				await module.exports.newLike(req, res);
				if (body.type === "like") await one.update({rating: one.rating+2});
				else await one.update({rating: one.rating-2});
			} else {
				if (body.type === "like") await one.update({rating: one.rating-1});
				else await one.update({rating: one.rating+1});
			}
			return;
		} else {
			if (body.type === "like") await one.update({rating: one.rating+1});
			else await one.update({rating: one.rating-1});
		}
		await likes.create({
			publish_date: new Date(),
			type: body.type,
			userId: decode.id,
			postId: post.id
		});
		await module.exports.getAllLikesFromPost(req, res);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.updatePost = async (req, res) => {
	try {
		const posts = db.Posts;
		const body = req.body;
		const post = await posts.findByPk(req.params.id);
		const newPost = await post.update({
			title: body.title,
			content: body.content,
		});
		res.send(newPost);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.deletePost = async (req, res) => {
	try {
		const posts = db.Posts;
		const post = await posts.destroy({
			where: {
				id: req.params.id
			},
		});
		res.send(post);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.deleteLikeFromPost = async (req, res) => {
	try {
		const likes = db.LikesToPosts;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		await likes.destroy({
			where: {
				postId: req.params.id,
				userId: decode.id
			},
		});
		await module.exports.getAllLikesFromPost(req, res);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

function getToken(req, res){
	const authHeader = req.get("authorization");
	return authHeader && authHeader.split(" ")[1];
}


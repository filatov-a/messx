const config = require("../config");
const jwt = require("jsonwebtoken");
const db = require("../models/index");

module.exports.getCommentById = async (req, res) => {
	try {
		const comments = db.Comments;
		const {id} = req.params;
		const comment = await comments.findOne({where: {id: id}});
		res.send(comment);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.getAllLikesFormComment = async (req, res) => {
	try {
		const comments = db.Comments;
		const {id} = req.params;
		const comment = await comments.findByPk(id, {
			include: db.LikesToComments,
		});
		let likes = [], dislikes = [];
		for (let i = 0; i < comment.LikesToComments.length; i++){
			if (comment.LikesToComments[i].type === "like") likes.push(comment.LikesToComments[i]);
			else dislikes.push(comment.LikesToComments[i]);
		}
		res.send({likes: likes, dislikes: dislikes});
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.newLike = async (req, res) => {
	try {
		const posts = db.Posts;
		const users = db.Users;
		const comments = db.Comments;
		const likes = db.LikesToComments;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		const comment = await comments.findByPk(req.params.id);
		const body = req.body;

		const post = await posts.findByPk(comment.postId);
		const one = await users.findOne({ where: { id: post.userId } });

		const prevLike = await likes.findOne({where: {
			userId: decode.id, commentId: comment.id
		}});
		if (prevLike !== null) {
			await module.exports.deleteLikeFromComment(req, res);
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
			commentId: comment.id
		});
		await module.exports.getAllLikesFormComment(req, res);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.updateComment = async (req, res) => {
	try {
		const comments = db.Comments;
		const body = req.body;
		const comment = await comments.findByPk(req.params.id);
		const newComment = await comment.update({
			content: body.content
		});
		res.send(newComment);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.deleteComment = async (req, res) => {
	try {
		const comments = db.Comments;
		const comment = await comments.destroy({
			where: {
				id: req.params.id
			},
		});
		res.send(comment);
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

module.exports.deleteLikeFromComment = async (req, res) => {
	try {
		const likes = db.LikesToComments;
		const token = getToken(req, res);
		const decode = await jwt.verify(token, config.token.accessToken);
		await likes.destroy({
			where: {
				commentId: req.params.id,
				userId: decode.id
			},
		});
		res.send("ok");
	} catch (err){
		res.status(400).send({ error: err.message });
	}
};

function getToken(req, res){
	const authHeader = req.get("authorization");
	return authHeader && authHeader.split(" ")[1];
}
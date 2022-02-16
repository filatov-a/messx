import Sequelize from "sequelize";

import Users from "./users.mjs";
import Chats from "./chats.mjs";
import Messages from "./messages.mjs";
import MessagesImages from "./messages-images.mjs";
import MessagesToAnswers from "./messages-to-answers.mjs";
import Posts from "./posts.mjs";
import LikesPosts from "./likes-posts.mjs";
import Comments from "./comments.mjs";
import LikesComments from "./likes-comments.mjs";
import PostsCategories from "./posts-categories.mjs";
import UsersToChats from "./users-to-chats.mjs";
import UsersToFollowers from "./users-to-followers.mjs";
import PostsImages from "./posts-images.mjs";
import CommentsToAnswers from "./comments-to-answers.mjs";
import ChatsToCategories from "./chats-to-categories.mjs";

import cnfgSeq from "../config/configSeq.cjs";
import ChatsCategories from "./chats-categories.mjs";

export default class DataBase {
	configSeq = null;
	config = null;
	models = {}
	type = null;
	sequelize = null;
	Sequelize = null;
	DataTypes = null;
	basename = null;

	params = {};
	retriesDefault = null;

	constructor(config) {
		this.config = config;
		this.type = config.projectType;
		console.log(this.type)
		this.configSeq = cnfgSeq[this.type]
		this.Sequelize = Sequelize;

		this.DataTypes = Sequelize.DataTypes;
		this.retriesDefault = 4;
	}

	init(){
		console.log("init db")
		this.initSequelize();
		this.include();
		this.initAndAssociateModels();
		return this.sequelize;
	}

	initSequelize(){
		this.sequelize = new this.Sequelize(
			this.configSeq.database,
			this.configSeq.username,
			this.configSeq.password,
			this.configSeq,
		);
	}

	include(){
		this.models = {
			Users,
			Posts,
			Chats,
			Messages,
			MessagesImages,
			MessagesToAnswers,
			LikesPosts,
			Comments,
			LikesComments,
			CommentsToAnswers,
			PostsCategories,
			UsersToChats,
			UsersToFollowers,
			PostsImages,
			ChatsCategories,
			ChatsToCategories
		};
	}

	initAndAssociateModels(){
		Object.values(this.models).forEach(model => model.init(this.sequelize));
		Object.values(this.models).forEach(model => model.initAssociateAndHooks(this.models));
	}
}

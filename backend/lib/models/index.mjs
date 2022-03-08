import Sequelize from "sequelize";

import Users from "./users.mjs";
import Chats from "./chats.mjs";
import Messages from "./messages.mjs";
import MessagesImages from "./messages-images.mjs";
import MessagesToMessages from "./messages-to-messages.mjs";
import Posts from "./posts.mjs";
import LikesPosts from "./likes-posts.mjs";
import PostsCategories from "./posts-categories.mjs";
import PostsToCategories from "./posts-to-categories.mjs";
import UsersToChats from "./users-to-chats.mjs";
import UsersToUsers from "./users-to-users.mjs";
import PostsImages from "./posts-images.mjs";
import PostsToPosts from "./posts-to-posts.mjs";
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
			MessagesToMessages,
			LikesPosts,
			PostsToPosts,
			PostsCategories,
			PostsToCategories,
			UsersToChats,
			UsersToUsers,
			PostsImages,
			ChatsCategories,
			ChatsToCategories,
		};
	}

	initAndAssociateModels(){
		Object.values(this.models).forEach(model => model.init(this.sequelize));
		Object.values(this.models).forEach(model => model.initAssociateAndHooks(this.models));
	}
}

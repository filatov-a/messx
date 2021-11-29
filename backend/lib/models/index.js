const Sequelize = require("sequelize");
const config = require("../config/config");

const Users = require("./users");
const Chats = require("./chats");
const Messages = require("./messages");
const MessagesToAnswers = require("./messages-to-answers");
const Posts = require("./posts");
const LikesPosts = require("./likes-posts");
const Comments = require("./comments")
const LikesComments = require("./likes-comments");
const PostsCategories = require("./posts-categories")
const UsersToChats = require("./users-to-chats")
const UsersToFollowers = require("./users-to-followers")
const PostsImages = require("./posts-images")
const CommentsToAnswers = require("./comments-to-answers")
const ChatsToCategories = require("./chats-to-categories")

const cnfgSeq = require(`${__dirname}/../config/configSeq.js`);

class DataBase {
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

	constructor() {
		this.config = config;
		this.type = this.config.projectType ? this.config.projectType : "development";
		this.configSeq = cnfgSeq[this.type]
		this.Sequelize = Sequelize;

		this.DataTypes = Sequelize.DataTypes;
		this.retriesDefault = 4;
	}

	init(){
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
		this.models.Users = Users;
		this.models.Posts = Posts;
		this.models.Chats = Chats;
		this.models.Messages = Messages;
		this.models.MessagesToAnswers = MessagesToAnswers;
		this.models.LikesPosts = LikesPosts;
		this.models.Comments = Comments;
		this.models.LikesComments = LikesComments;
		this.models.CommentsToAnswers = CommentsToAnswers;
		this.models.PostsCategories = PostsCategories;
		this.models.UsersToChats = UsersToChats;
		this.models.UsersToFollowers = UsersToFollowers;
		this.models.PostsImages = PostsImages
		this.models.ChatsCategories = PostsCategories;
		this.models.ChatsToCategories = ChatsToCategories;
	}

	initAndAssociateModels(){
		Object.values(this.models).forEach(model => model.init(this.sequelize));
		Object.values(this.models).forEach(model => model.initAssociateAndHooks(this.models));
	}
}

module.exports = DataBase;

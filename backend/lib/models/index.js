const path = require("path");
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

class DataBase {
	configSeq = null;
	config = null;
	db = {}
	type = null;
	sequelize = null;
	Sequelize = null;
	DataTypes = null;
	basename = null;

	constructor() {
		this.config = config;
		this.type = this.config.project ? this.config.project : "development";
		this.configSeq = require(`${__dirname}/../config/configSeq.js`)[this.type]
		this.Sequelize = Sequelize;

		this.sequelize = new this.Sequelize(
			this.configSeq.database,
			this.configSeq.username,
			this.configSeq.password,
			this.configSeq
		);

		this.DataTypes = Sequelize.DataTypes;
		this.basename = path.basename(__filename);
		this.init();
	}

	init(){
		this.include();
		this.initAndAssociateModels()
	}

	include(){
		this.db.Users = Users;
		this.db.Chats = Chats;
		this.db.Messages = Messages;
		this.db.MessagesToAnswers = MessagesToAnswers;
		this.db.Posts = Posts;
		this.db.LikesPosts = LikesPosts;
		this.db.Comments = Comments;
		this.db.LikesComments = LikesComments;
		this.db.CommentsToAnswers = CommentsToAnswers;
		this.db.PostsCategories = PostsCategories;
		this.db.UsersToChats = UsersToChats;
		this.db.UsersToFollowers = UsersToFollowers;
		this.db.PostsImages = PostsImages
		this.db.ChatsCategories = PostsCategories;
		this.db.ChatsToCategories = ChatsToCategories;
	}

	initAndAssociateModels(){
		Object.values(this.db).forEach(model => model.init(this.sequelize));
		Object.values(this.db).forEach(model => model.initAssociateAndHooks(this.db));
	}
}

module.exports = DataBase;

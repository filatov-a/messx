const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const configApp = require(`${__dirname}/../config/config.js`);
const type = configApp.project || "development";
const config = require(`${__dirname}/../config/configSeq.js`)[type];
let db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);
const DataTypes = Sequelize.DataTypes;

db.Users = require("./users")(sequelize, DataTypes);
db.Chats = require("./chats")(sequelize, DataTypes);
db.Messages = require("./messages")(sequelize, DataTypes);
db.MessegesToAnswers = require("./messages-to-answers")(sequelize, DataTypes);
db.Posts = require("./posts")(sequelize, DataTypes);
db.LikesPosts = require("./likes-posts")(sequelize, DataTypes);
db.Comments = require("./comments")(sequelize, DataTypes);
db.LikesComments = require("./likes-comments")(sequelize, DataTypes);
db.CommentsToAnswers = require("./comments-to-answers")(sequelize, DataTypes);
db.PostsCategories = require("./posts-categories")(sequelize, DataTypes);
db.UsersToChats = require("./users-to-chats")(sequelize, DataTypes);
db.UsersToFollowers = require("./users-to-followers")(sequelize, DataTypes);
db.PostsImages = require("./posts-images")(sequelize, DataTypes);
db.ChatsCategories = require("./chats-categories")(sequelize, DataTypes);
db.ChatsToCategories = require("./chats-to-categories")(sequelize, DataTypes);

Object.keys(db).forEach(async (modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

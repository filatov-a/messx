"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("LikesToComments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			type: {
				type: Sequelize.ENUM(["like", "dislike"]),
				allowNull: false
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Users", key: "id" },
				onUpdate: "CASCADE",
        		onDelete: "CASCADE",
			},
			commentId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Comments", key: "id" },
				onUpdate: "CASCADE",
        		onDelete: "CASCADE",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("LikesToComments");
	}
};
"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("UsersToPosts", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.UUID,
				references: {model: "Users", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
				defaultValue: null,
			},
			postId: {
				type: Sequelize.UUID,
				references: {model: "Posts", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
				defaultValue: null,
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
		await queryInterface.dropTable("UsersToPosts");
	}
};

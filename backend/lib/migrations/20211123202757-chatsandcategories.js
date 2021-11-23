"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("ChatsAndCategories", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			cahtId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Chats", key: "id" },
				onUpdate: "CASCADE",
        onDelete: "CASCADE",
			},
			categoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "ChatsCategories", key: "id" },
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
		await queryInterface.dropTable("ChatsAndCategories");
	}
};
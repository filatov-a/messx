"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("ChatsToCategories", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			chatId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "Chats", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			categoryId: {
				type: Sequelize.UUID,
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
		await queryInterface.dropTable("ChatsToCategories");
	}
};

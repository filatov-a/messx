"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("UsersToChats", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "Users", key: "id" },
				onUpdate: "CASCADE",
        		onDelete: "CASCADE",
			},
			chatId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "Chats", key: "id" },
				onUpdate: "CASCADE",
        		onDelete: "CASCADE",
			},
			isAdmin: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
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
		await queryInterface.dropTable("UsersToChats");
	}
};

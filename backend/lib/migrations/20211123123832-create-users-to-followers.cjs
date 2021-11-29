"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("UsersToFollowers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {model: "Users", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
				defaultValue: null,
			},
			followerId: {
				type: Sequelize.INTEGER,
				references: {model: "Users", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
				defaultValue: null,
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
		await queryInterface.dropTable("UsersToFollowers");
	}
};

"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Posts", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			content: {
				type: Sequelize.STRING,
				allowNull: false
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "Users", key: "id" },
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
		await queryInterface.dropTable("Posts");
	}
};

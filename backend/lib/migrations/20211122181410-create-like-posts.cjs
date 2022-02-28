"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("LikesPosts", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			type: {
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
			postId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "Posts", key: "id" },
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
		await queryInterface.dropTable("LikesPosts");
	}
};

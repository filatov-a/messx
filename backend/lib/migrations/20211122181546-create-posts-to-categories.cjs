"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("PostsToCategories", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			postId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "Posts", key: "id" },
				onUpdate: "CASCADE",
        		onDelete: "CASCADE",
			},
			categoryId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "PostsCategories", key: "id" },
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
		await queryInterface.dropTable("PostsToCategories");
	}
};

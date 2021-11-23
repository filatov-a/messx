"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("PostsCategories", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			postId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Posts", key: "id" },
				onUpdate: 'CASCADE',
        		onDelete: 'CASCADE',
			},
			categoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Categories", key: "id" },
				onUpdate: 'CASCADE',
        		onDelete: 'CASCADE',
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
		await queryInterface.dropTable("PostsCategories");
	}
};
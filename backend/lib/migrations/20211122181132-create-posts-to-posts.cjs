module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("PostsToPosts", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			postId: {
				type: Sequelize.UUID,
				references: {model: "Posts", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				defaultValue: null,
			},
			questionId: {
				type: Sequelize.UUID,
				references: {model: "Posts", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				defaultValue: null,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("PostsToPosts");
	},
};

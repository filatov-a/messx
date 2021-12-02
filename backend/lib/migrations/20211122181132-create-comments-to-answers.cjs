module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("CommentsToAnswers", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			commentId: {
				type: Sequelize.UUID,
				references: {model: "Comments", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
				defaultValue: null,
			},
			commentAnswerId: {
				type: Sequelize.UUID,
				references: {model: "Comments", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
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
		await queryInterface.dropTable("CommentsToAnswers");
	},
};

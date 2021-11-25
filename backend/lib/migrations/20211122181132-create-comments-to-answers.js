module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("CommentsToAnswers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			commentId: {
				type: Sequelize.INTEGER,
				references: {model: "Comments", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
				defaultValue: null,
			},
			commentAnswerId: {
				type: Sequelize.INTEGER,
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

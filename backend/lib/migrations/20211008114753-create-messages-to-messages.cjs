module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("MessagesToMessages", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			messageId: {
				type: Sequelize.UUID,
				references: {model: "Messages", key: "id"},
				onUpdate: "CASCADE",
        		onDelete: "SET NULL",
				defaultValue: null,
			},
			answerId: {
				type: Sequelize.UUID,
				references: {model: "Messages", key: "id"},
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
		await queryInterface.dropTable("MessagesToMessages");
	},
};

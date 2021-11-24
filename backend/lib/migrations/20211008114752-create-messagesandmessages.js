module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("MessagesAndMessages", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			messageId: {
				type: Sequelize.INTEGER,
				references: {model: "Messages", key: "id"},
				onUpdate: "CASCADE",
        		onDelete: "SET NULL",
				defaultValue: null,
			},
			messageAnswerId: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("MessagesAndMessages");
	},
};

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Messages", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			title: {
				type: Sequelize.STRING,
				defaultValue: null,
			},
			descriptions: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			image: {
				type: Sequelize.STRING,
				defaultValue: null,
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			chatId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {model: "Chats", key: "id"},
				onUpdate: "CASCADE",
        		onDelete: "CASCADE",
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {model: "Users", key: "id"},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
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
		await queryInterface.dropTable("Messages");
	},
};

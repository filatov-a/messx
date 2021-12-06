module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			full_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			gender: {
				type: Sequelize.ENUM(["male", "female"]),
				defaultValue: "male",
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			profile_picture: {
				type: Sequelize.STRING,
				defaultValue: "defaultUser-male.png",
			},
			rating: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			role: {
				type: Sequelize.ENUM(["user", "admin", "superAdmin"]),
				defaultValue: "user",
			},
			isVerified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
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
		await queryInterface.dropTable("Users");
	},
};

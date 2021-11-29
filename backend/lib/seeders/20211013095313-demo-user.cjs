"use strict";
const argon2 = require("argon2");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("Users", [{
			username: "admin",
			password: "admin",
			full_name: "admin",
			email: "dsdsccdscscsfcsfcsc@gamil.com",
			role: "admin",
			isVerified: true,
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("People", null, {});
	}
};

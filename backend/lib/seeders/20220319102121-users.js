"use strict";
const faker = require("faker");
const argon2 = require("argon2");

module.exports = {
	async up (queryInterface, Sequelize) {
		for (let i = 0; i < 10; i++){
			const random_full_name = faker.random.word();
			const random_gender = faker.random.arrayElement(["male", "female"]);
			const random_password = await argon2.hash("12345678");
			const random_email = faker.internet.email();
			const random_rating = faker.datatype.number({
				"min": 0,
				"max": 100
			});

			await queryInterface.bulkInsert("Users", [{
				id: random_full_name,
				password: random_password,
				full_name: random_full_name,
				gender: random_gender,
				email: random_email,
				profile_picture: `defaultUser-${random_gender}.png`,
				rating: random_rating,
				role: "user",
				status: "offline",
			}], {});
		}
		await queryInterface.bulkInsert("Users", [{
			id: "admin",
			password: await argon2.hash("admin"),
			full_name: "admin",
			gender: "male",
			email: "",
			profile_picture: "defaultUser-male.png",
			rating: 0,
			role: "superAdmin",
			status: "offline",
		}], {});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	}
};
